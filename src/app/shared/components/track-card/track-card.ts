import { ChangeDetectionStrategy, Component, input, computed, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Track } from '@core/models/jamendo/tracks.model';
import { TrackPlaysShortPipe } from '@shared/pipes/track-plays-short-pipe';
import { TrackDurationShortPipe } from '@shared/pipes/track-duration-short-pipe';
import { PlayerService } from '@core/services/player.service';

@Component({
  selector: 'hive-track-card',
  imports: [MatIcon, RouterLink, TrackPlaysShortPipe, TrackDurationShortPipe],
  templateUrl: './track-card.html',
  styleUrl: './track-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCard {
  private readonly playerService = inject(PlayerService);
  readonly track = input.required<Track>();
  readonly isPlaying = computed(
    () => this.playerService.isPlayingTrack() && this.playerService.playingTrackId() === Number(this.track().id)
  );

  playTrack(): void {
    this.playerService.toggle(this.track());
  }
}
