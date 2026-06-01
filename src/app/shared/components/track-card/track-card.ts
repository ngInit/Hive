import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Track } from '@core/models/track.model';
import { TrackPlaysShortPipe } from '@shared/pipes/track-plays-short-pipe';
import { TrackDurationShortPipe } from '@shared/pipes/track-duration-short-pipe';

@Component({
  selector: 'hive-track-card',
  imports: [MatIcon, RouterLink, TrackPlaysShortPipe, TrackDurationShortPipe],
  templateUrl: './track-card.html',
  styleUrl: './track-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCard {
  playIcon = 'play_circle_outline';
  pauseIcon = 'pause_circle_outline';
  readonly track = input.required<Track>();
}
