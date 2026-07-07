import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Track } from '@core/models/jamendo/tracks.model';
import { TrackPlaysShortPipe } from '@shared/pipes/track-plays-short-pipe';

@Component({
  selector: 'hive-playlists-page',
  imports: [MatIcon, TrackPlaysShortPipe],
  templateUrl: './playlists-page.html',
  styleUrl: './playlists-page.scss',
})
export class PlaylistsPage {
  readonly likedTracks = signal<Track[]>([]);

  showLikedTracks(): void {
    console.log('Show liked tracks');
  }
}
