import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hive-track-card',
  imports: [],
  templateUrl: './track-card.html',
  styleUrl: './track-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackCard {
  title = 'track-card works!';
}
