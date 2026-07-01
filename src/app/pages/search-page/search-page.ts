import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { JamendoService } from '@core/services/jamendo.service';
import { NgTemplateOutlet } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EndPoint, JamendoSearchResponse } from '@core/models/jamendo/jamendo.model';
import { TrackCard } from '@components/track-card/track-card';
import { AlbumCard } from '@components/album-card/album-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

const INITIAL_SEARCH: JamendoSearchResponse = {
  items: [],
  total: 0,
  offset: 0,
  limit: 21,
};

@Component({
  selector: 'hive-search-page',
  imports: [NgTemplateOutlet, MatPaginator, TrackCard, AlbumCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  private readonly route = inject(ActivatedRoute);
  private readonly navigationService = inject(NavigationService);
  private readonly jamendoService = inject(JamendoService);
  private readonly artists = signal<JamendoSearchResponse>(INITIAL_SEARCH);
  private readonly albums = signal<JamendoSearchResponse>(INITIAL_SEARCH);
  private readonly tracks = signal<JamendoSearchResponse>(INITIAL_SEARCH);
  private readonly query = toSignal(
    this.route.queryParamMap.pipe(
      map((parameter) => {
        return parameter.get('q') ?? '';
      })
    ),
    {
      initialValue: '',
    }
  );
  readonly artistsContext = computed(() => {
    return {
      items: this.artists().items,
      search: this.artists(),
      type: 'Artists',
    };
  });
  readonly albumsContext = computed(() => {
    return {
      items: this.albums().items,
      search: this.albums(),
      type: 'Albums',
    };
  });
  readonly tracksContext = computed(() => {
    return {
      items: this.tracks().items,
      search: this.tracks(),
      type: 'Tracks',
    };
  });
  readonly isArtistsLoading = signal<boolean>(false);
  readonly isAlbumsLoading = signal<boolean>(false);
  readonly isTracksLoading = signal<boolean>(false);
  readonly searchState = {
    artists: { data: this.artists, loading: this.isArtistsLoading },
    albums: { data: this.albums, loading: this.isAlbumsLoading },
    tracks: { data: this.tracks, loading: this.isTracksLoading },
  };

  constructor() {
    effect(() => {
      const query = this.query();
      this.artists.set(INITIAL_SEARCH);
      this.albums.set(INITIAL_SEARCH);
      this.tracks.set(INITIAL_SEARCH);
      if (!query) {
        return;
      } else {
        this.loadData(query);
      }
    });
  }

  private loadSectionData(query: string, type: EndPoint, offset = 0, limit = 0): void {
    const { data, loading } = this.searchState[type];
    loading.set(true);

    void this.jamendoService
      .getSearchPage(query, type, offset, limit)
      .then((response) => {
        data.set(response);
      })
      .catch(() => {
        data.set(INITIAL_SEARCH);
      })
      .finally(() => {
        loading.set(false);
      });
  }

  loadData(query: string): void {
    this.loadSectionData(query, 'artists', 0, 21);
    this.loadSectionData(query, 'albums', 0, 21);
    this.loadSectionData(query, 'tracks', 0, 21);
  }

  isEmpty(total: number | string): boolean {
    return Number(total) === 0;
  }

  paginationEvent(event: PageEvent, type: EndPoint): void {
    const offset = event.pageIndex * event.pageSize;
    const limit = event.pageSize;
    this.loadSectionData(this.query(), type, offset, limit);
  }

  calculatePageSizesOptions(total: number): number[] {
    const sizes = [21, 42, 84, 168, total];
    if (total > 21) {
      return sizes.filter((size) => {
        return size <= total;
      });
    }
    return [total];
  }

  async goToArtist(id: string): Promise<void> {
    await this.navigationService.goToArtist(id);
  }
}
