import { ChangeDetectionStrategy, Component, inject, signal, effect, computed } from '@angular/core';
import { TagsPanel } from '@components/tags-panel/tags-panel';
import { Carousel } from '@components/carousel/carousel';
import { Track } from '@core/models/track.model';
import { TracksService } from '@core/services/tracks.service';

@Component({
  selector: 'hive-landing-page',
  imports: [TagsPanel, Carousel],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  readonly tracksService = inject(TracksService);
  readonly popularTracks = signal<Track[]>([]);
  readonly popularTracksEmpty = computed(() => {
    return !this.tracksService.tracks.isLoading() && this.popularTracks().length === 0;
  });

  constructor() {
    this.tracksService.searchTracks('David TMX');

    effect(() => {
      const trackResponse = this.tracksService.tracks.value();
      if (trackResponse) {
        this.popularTracks.set(trackResponse.results);
      }
    });
  }
}
