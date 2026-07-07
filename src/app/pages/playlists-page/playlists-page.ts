import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Track } from '@core/models/jamendo/tracks.model';
import { TrackPlaysShortPipe } from '@shared/pipes/track-plays-short-pipe';
import { tracksMock } from '@shared/mocks/tracks.mock';
import { NgTemplateOutlet } from '@angular/common';
import { TrackCard } from '@components/track-card/track-card';

@Component({
  selector: 'hive-playlists-page',
  imports: [MatIcon, TrackPlaysShortPipe, NgTemplateOutlet, TrackCard],
  templateUrl: './playlists-page.html',
  styleUrl: './playlists-page.scss',
})
export class PlaylistsPage {
  readonly likedTracks = signal<Track[]>(tracksMock.results);
  readonly tracklist = signal<Track[]>([]);

  showTracklist(): void {
    this.tracklist.set(this.likedTracks());
  }
}
