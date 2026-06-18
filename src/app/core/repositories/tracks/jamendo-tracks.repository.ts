import { Injectable, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '@env/environment';
import { TracksResponse } from '@core/models/jamendo/tracks.model';
import { TracksRepository } from './tracks.repository';

@Injectable()
export class JamendoTracksRepository implements TracksRepository {
  readonly searchQuery = signal('');

  readonly tracks = httpResource<TracksResponse>(() => {
    const query = this.searchQuery();
    if (!query) {
      return undefined;
    }

    return {
      url: `${environment.jamendoApiUrl}/tracks/`,
      params: {
        client_id: environment.jamendoClientId,
        format: 'json',
        artist_name: query,
        include: 'musicinfo+stats',
      },
    };
  });

  search(query: string): void {
    this.searchQuery.set(query);
  }
}
