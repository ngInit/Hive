import { ChangeDetectionStrategy, Component, input, computed, inject } from '@angular/core';
import { NavigationService } from '@core/services/navigation.service';
import { PlayerService } from '@core/services/player.service';
import { MatIcon } from '@angular/material/icon';
import { Track } from '@core/models/jamendo/tracks.model';
import { TrackPlaysShortPipe } from '@shared/pipes/track-plays-short-pipe';
import { TrackDurationShortPipe } from '@shared/pipes/track-duration-short-pipe';

@Component({
  selector: 'hive-track-card',
  imports: [MatIcon, TrackPlaysShortPipe, TrackDurationShortPipe],
  templateUrl: './track-card.html',
  styleUrl: './track-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCard {
  private readonly navigationService = inject(NavigationService);
  private readonly playerService = inject(PlayerService);
  readonly allTracks = input<Track[] | null>();
  readonly track = input.required<Track>();
  readonly isActive = computed(() => {
    return this.playerService.playingTrack()?.id === this.track().id;
  });
  readonly isPlaying = computed(() => {
    return this.isActive() && this.playerService.isPlayingTrack();
  });

  playTrack(): void {
    this.playerService.toggle(this.track(), this.allTracks());
  }

  async goToArtist(): Promise<void> {
    await this.navigationService.goToArtist(this.track().artist_id);
  }

  async goToTrack(): Promise<void> {
    await this.navigationService.goToTrack(this.track().id);
  }
}
