import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CardTrack } from '@core/models/track.model';

const track: CardTrack = {
  track_id: 0,
  artist_id: 0,
  artist_name: "Siren's Embrace",
  track_name: 'Blood is My Crown',
  track_cover: 'https://m.media-amazon.com/images/I/51Q+Utavr1L._UX358_FMwebp_QL85_.jpg',
  track_duration: '4:50',
  track_plays: '1.7M plays',
};

@Component({
  selector: 'hive-track-card',
  imports: [MatIcon, RouterLink],
  templateUrl: './track-card.html',
  styleUrl: './track-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCard {
  playIcon = 'play_circle_outline';
  pauseIcon = 'pause_circle_outline';
  protected track: CardTrack = track;
}
