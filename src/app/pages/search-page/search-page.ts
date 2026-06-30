import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '@core/services/navigation.service';
import { JamendoService } from '@core/services/jamendo.service';
import { NgTemplateOutlet } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { JamendoSearchResponse } from '@core/models/jamendo/jamendo.model';

const INITIAL_SEARCH: JamendoSearchResponse = {
  items: [],
  total: 0,
  offset: 0,
  limit: 21,
};

@Component({
  selector: 'hive-search-page',
  imports: [NgTemplateOutlet, MatPaginator],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  private readonly route = inject(ActivatedRoute);
  private readonly navigationService = inject(NavigationService);
  private readonly jamendoService = inject(JamendoService);
  private readonly query = this.route.snapshot.queryParamMap.get('q') ?? '';
  private readonly artists = signal<JamendoSearchResponse>(INITIAL_SEARCH);
  private readonly albums = signal<JamendoSearchResponse>(INITIAL_SEARCH);
  private readonly tracks = signal<JamendoSearchResponse>(INITIAL_SEARCH);
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

  constructor() {
    console.log(this.query);
    this.loadData(this.query);
  }

  loadData(query: string): void {
    void Promise.all([
      this.jamendoService.getSearchPage(query, 'artists', 0, 21),
      this.jamendoService.getSearchPage(query, 'albums', 0, 21),
      this.jamendoService.getSearchPage(query, 'tracks', 0, 21),
    ]).then(([artists, albums, tracks]) => {
      this.artists.set(artists);
      this.albums.set(albums);
      this.tracks.set(tracks);
    });
  }

  paginationEvent(event: PageEvent) {
    console.log(event);
    console.log(this.artists());
  }

  async goToArtist(): Promise<void> {
    await this.navigationService.goToArtist('0');
  }

  async goToAlbum(): Promise<void> {
    await this.navigationService.goToAlbum('0');
  }

  async goToTrack(): Promise<void> {
    await this.navigationService.goToTrack('0');
  }
}
