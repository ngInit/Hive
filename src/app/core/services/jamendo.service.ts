import { JAMENDO_REPOSITORY } from '@core/repositories/jamendo/jamendo.repository';
import { Injectable, inject } from '@angular/core';
import { getDateRangeFromToday } from '@utils/dateRange';
import { EndPoint, isJamendoSuccess, JamendoResponse, JamendoSearchResponse } from '@core/models/jamendo/jamendo.model';
import { Artist } from '@core/models/jamendo/artists.model';
import { Album } from '@core/models/jamendo/albums.model';
import { Track } from '@core/models/jamendo/tracks.model';

@Injectable({
  providedIn: 'root',
})
export class JamendoService {
  private readonly repository = inject(JAMENDO_REPOSITORY);

  private getPaginated<T>(
    inputResponse: JamendoResponse<T>,
    inputOffset: number,
    inputLimit: number
  ): { items: T[]; total: number; offset: number; limit: number } {
    if (!isJamendoSuccess(inputResponse)) {
      return {
        items: [],
        total: 0,
        offset: inputOffset,
        limit: inputLimit,
      };
    }
    return {
      items: inputResponse.results,
      total:
        inputResponse.headers.results_fullcount ?? inputResponse.headers.results_count ?? inputResponse.results.length,
      offset: inputOffset,
      limit: inputLimit,
    };
  }

  async getSuggestions(query: string): Promise<{ artists: Artist[]; albums: Album[]; tracks: Track[] }> {
    const searchString = query.trim();
    if (!searchString) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }
    const common = { namesearch: searchString, limit: '3' };
    const [artistsResponse, albumsResponse, tracksResponse] = await Promise.all([
      this.repository.createRequest('artists', common),
      this.repository.createRequest('albums', common),
      this.repository.createRequest('tracks', common),
    ]);
    return {
      artists: isJamendoSuccess(artistsResponse) ? artistsResponse.results : [],
      albums: isJamendoSuccess(albumsResponse) ? albumsResponse.results : [],
      tracks: isJamendoSuccess(tracksResponse) ? tracksResponse.results : [],
    };
  }

  async getSearchPage(query: string, entity: EndPoint, offset = 0, limit = 12): Promise<JamendoSearchResponse> {
    const searchString = query.trim();
    const common = { namesearch: searchString, offset: offset, limit: String(limit), fullcount: true };
    if (!searchString) {
      return {
        items: [],
        total: 0,
        offset: offset,
        limit: limit,
      };
    }

    switch (entity) {
      case 'artists': {
        const artistsResponse = await this.repository.createRequest('artists', common);
        return this.getPaginated(artistsResponse, offset, limit);
      }
      case 'albums': {
        const albumsResponse = await this.repository.createRequest('albums', common);
        return this.getPaginated(albumsResponse, offset, limit);
      }
      case 'tracks': {
        const tracksResponse = await this.repository.createRequest('tracks', { ...common, include: ['stats'] });
        return this.getPaginated(tracksResponse, offset, limit);
      }
    }
  }

  async getLandingPage(): Promise<{ popularSongs: Track[]; newReleases: Track[]; newAlbums: Album[] }> {
    const [popularSongsResponse, newReleasesResponse, newAlbumsResponse] = await Promise.all([
      this.repository.createRequest('tracks', {
        limit: '10',
        boost: 'popularity_month',
        include: ['stats'],
      }),
      this.repository.createRequest('tracks', {
        limit: '10',
        datebetween: getDateRangeFromToday(30),
        order: ['releasedate'],
        include: ['stats'],
      }),
      this.repository.createRequest('albums', {
        limit: '10',
        datebetween: getDateRangeFromToday(30),
        order: ['releasedate'],
      }),
    ]);

    if (
      !isJamendoSuccess(popularSongsResponse) ||
      !isJamendoSuccess(newReleasesResponse) ||
      !isJamendoSuccess(newAlbumsResponse)
    ) {
      throw new Error('Failed to get landing page data');
    }

    return {
      popularSongs: popularSongsResponse.results,
      newReleases: newReleasesResponse.results,
      newAlbums: newAlbumsResponse.results,
    };
  }

  async getArtistPage(id: string): Promise<{ artist: Artist; albums: Album[]; tracks: Track[] }> {
    const [artistResponse, albumsResponse, tracksResponse] = await Promise.all([
      this.repository.createRequest('artists', {
        id: [Number(id)],
        limit: '1',
      }),
      this.repository.createRequest('albums', {
        artist_id: [id],
        limit: '10',
      }),
      this.repository.createRequest('tracks', {
        artist_id: [id],
        limit: '10',
        include: ['stats'],
      }),
    ]);

    if (!isJamendoSuccess(artistResponse) || !isJamendoSuccess(albumsResponse) || !isJamendoSuccess(tracksResponse)) {
      throw new Error('Failed to get artist page data');
    }

    if (!artistResponse.results[0]) {
      throw new Error(`Artist with ID: ${id} not found`);
    }

    return {
      artist: artistResponse.results[0],
      albums: albumsResponse.results,
      tracks: tracksResponse.results,
    };
  }

  async getAlbumPage(id: string): Promise<{ album: Album; tracks: Track[] }> {
    const [albumResponse, tracksResponse] = await Promise.all([
      this.repository.createRequest('albums', {
        id: [Number(id)],
        limit: '1',
      }),
      this.repository.createRequest('tracks', {
        album_id: [id],
        limit: 'all',
        include: ['stats'],
      }),
    ]);

    if (!isJamendoSuccess(albumResponse) || !isJamendoSuccess(tracksResponse)) {
      throw new Error('Failed to get album page data');
    }

    if (!albumResponse.results[0]) {
      throw new Error(`Album with ID: ${id} not found`);
    }

    return {
      album: albumResponse.results[0],
      tracks: tracksResponse.results,
    };
  }
  async getTrackPage(id: string): Promise<{ track: Track }> {
    const trackResponse = await this.repository.createRequest('tracks', {
      id: [Number(id)],
      limit: '1',
      include: ['musicinfo', 'stats', 'lyrics'],
    });

    if (!isJamendoSuccess(trackResponse)) {
      throw new Error('Failed to get track page data');
    }

    if (!trackResponse.results[0]) {
      throw new Error(`Track with ID: ${id} not found`);
    }

    return {
      track: trackResponse.results[0],
    };
  }

  async getTracksByTag(
    tags: string[],
    offset = 0,
    limit = 25
  ): Promise<{ items: Track[]; total: number; offset: number; limit: number }> {
    const tracksResponse = await this.repository.createRequest('tracks', {
      tags: tags,
      limit: String(limit),
      offset: offset,
      fullcount: true,
      include: ['stats'],
    });

    return this.getPaginated(tracksResponse, offset, limit);
  }
}
