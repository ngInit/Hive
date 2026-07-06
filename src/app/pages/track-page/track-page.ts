import { Component, computed, effect, inject, signal } from '@angular/core';
import { JamendoService } from '@core/services/jamendo.service';
import { NavigationService } from '@core/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Carousel } from '@components/carousel/carousel';
import { Track } from '@core/models/jamendo/tracks.model';
import { TrackCard } from '@components/track-card/track-card';
import { MatIcon } from '@angular/material/icon';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { TrackDurationShortPipe } from '@shared/pipes/track-duration-short-pipe';
import { TrackPlaysShortPipe } from '@shared/pipes/track-plays-short-pipe';

interface TrackCacheData {
  track: Track;
  similarTracks: Track[];
}

@Component({
  selector: 'hive-track-page',
  imports: [MatIcon, MatChipSet, MatChip, Carousel, TrackCard, TrackDurationShortPipe, TrackPlaysShortPipe],
  templateUrl: './track-page.html',
  styleUrl: './track-page.scss',
})
export class TrackPage {
  private readonly route = inject(ActivatedRoute);
  private readonly navigationService = inject(NavigationService);
  private readonly jamendoService = inject(JamendoService);
  private readonly cache = new Map<string, TrackCacheData>();
  readonly errorMessage = signal<string | null>(null);
  readonly isLoading = signal(false);
  readonly track = signal<Track | null>(null);
  readonly similarTracks = signal<Track[] | null>(null);
  readonly isEmpty = computed(() => {
    const similarTracks = this.similarTracks();
    return !similarTracks || similarTracks.length === 0;
  });
  private readonly trackId = toSignal(
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
      const id = this.trackId();
      if (!id) {
        this.clearData();
        this.isLoading.set(false);
        return;
      }
      this.loadPage(id);
    });
  }

  private clearData(): void {
    this.track.set(null);
    this.similarTracks.set(null);
    this.errorMessage.set(null);
  }

  private loadPage(id: string): void {
    this.isLoading.set(true);
    const cached = this.cache.get(id);
    if (cached) {
      this.track.set(cached.track);
      this.similarTracks.set(cached.similarTracks);
      this.isLoading.set(false);
      return;
    }
    this.clearData();

    void this.jamendoService
      .getTrackPage(id)
      .then((response) => {
        if (this.trackId() !== id) {
          this.isLoading.set(false);
          return;
        }

        const track = response.track;
        const tags = track.musicinfo?.tags.genres ?? [];
        this.track.set(track);
        this.similarTracks.set([]);

        if (!tags.length) {
          const data = { track: track, similarTracks: [] };
          this.cache.set(id, data);
          this.isLoading.set(false);
          return;
        }

        void this.jamendoService
          .getTracksByTag(tags)
          .then((response) => {
            if (this.trackId() !== id) {
              this.isLoading.set(false);
              return;
            }

            const data = { track: track, similarTracks: response.items };
            this.similarTracks.set(response.items);
            this.cache.set(id, data);
            this.isLoading.set(false);
          })
          .catch(() => {
            this.isLoading.set(false);
          });
      })
      .catch(() => {
        this.errorMessage.set(`Can't load this track. Please try again later.`);
        this.isLoading.set(false);
      });
  }

  async goToArtist(): Promise<void> {
    await this.navigationService.goToArtist(this.track()?.artist_id);
  }

  async goToAlbum(): Promise<void> {
    await this.navigationService.goToAlbum(this.track()?.album_id);
  }
}
