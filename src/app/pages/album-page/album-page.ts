import { Component, computed, effect, inject, signal } from '@angular/core';
import { JamendoService } from '@core/services/jamendo.service';
import { NavigationService } from '@core/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Carousel } from '@components/carousel/carousel';
import { TrackCard } from '@components/track-card/track-card';
import { Album } from '@core/models/jamendo/albums.model';
import { Track } from '@core/models/jamendo/tracks.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

interface AlbumCacheData {
  album: Album;
  tracks: Track[];
}

@Component({
  selector: 'hive-album-page',
  imports: [Carousel, MatIcon, TrackCard],
  templateUrl: './album-page.html',
  styleUrl: './album-page.scss',
})
export class AlbumPage {
  private readonly route = inject(ActivatedRoute);
  private readonly navigationService = inject(NavigationService);
  private readonly jamendoService = inject(JamendoService);
  private readonly cache = new Map<string, AlbumCacheData>();
  readonly errorMessage = signal<string | null>(null);
  readonly isLoading = signal(false);
  readonly album = signal<Album | null>(null);
  readonly tracks = signal<Track[] | null>(null);
  readonly isEmpty = computed(() => {
    const tracks = this.tracks();
    return !tracks || tracks.length === 0;
  });

  //TODO: move it to utils and use it in other pages
  private readonly albumId = toSignal(
    this.route.queryParamMap.pipe(
      map((parameter) => {
        return parameter.get('q') ?? '';
      })
    ),
    {
      initialValue: '',
    }
  );

  constructor() {
    effect(() => {
      const id = this.albumId();
      if (!id) {
        this.clearData();
        this.isLoading.set(false);
        return;
      }
      this.loadPage(id);
    });
  }

  private clearData(): void {
    this.album.set(null);
    this.tracks.set(null);
    this.errorMessage.set(null);
  }

  private loadPage(id: string): void {
    this.isLoading.set(true);
    const cached = this.cache.get(id);
    if (cached) {
      this.album.set(cached.album);
      this.tracks.set(cached.tracks);
      this.isLoading.set(false);
      return;
    }
    this.clearData();

    void this.jamendoService
      .getAlbumPage(id)
      .then((response) => {
        this.album.set(response.album);
        this.tracks.set(response.tracks);
        const data = { album: response.album, tracks: response.tracks };
        this.cache.set(id, data);
        this.isLoading.set(false);
      })
      .catch(() => {
        this.errorMessage.set(`Can't load this track. Please try again later.`);
        this.isLoading.set(false);
      });
  }

  async goToArtist(): Promise<void> {
    await this.navigationService.goToArtist(this.album()?.artist_id);
  }
}
