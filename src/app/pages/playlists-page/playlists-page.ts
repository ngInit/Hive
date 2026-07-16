import { Component, signal, inject, effect } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Track } from '@core/models/jamendo/tracks.model';
import { TrackPlaysShortPipe } from '@shared/pipes/track-plays-short-pipe';
import { tracksMock } from '@shared/mocks/tracks.mock';
import { NgTemplateOutlet } from '@angular/common';
import { TrackCard } from '@components/track-card/track-card';
import { PlaylistService } from '@core/services/playlist.service';
import { Playlist } from '@core/models/playlist.model';

@Component({
  selector: 'hive-playlists-page',
  imports: [MatIcon, TrackPlaysShortPipe, NgTemplateOutlet, TrackCard],
  templateUrl: './playlists-page.html',
  styleUrl: './playlists-page.scss',
})
export class PlaylistsPage {
  readonly playlistsService = inject(PlaylistService);
  readonly likedTracks = signal<Track[]>(tracksMock.results);
  readonly tracklist = signal<Track[]>([]);
  readonly lists = signal<Playlist[]>([]);

  constructor() {
    effect(() => {
      void this.playlistsService.loadAllPlaylists();
      this.lists.set(this.playlistsService.playlists());
    });
  }

  async showTracklist(): Promise<void> {
    this.tracklist.set(this.likedTracks());
    await this.playlistsService.loadAllPlaylists();
    this.lists.set(this.playlistsService.playlists());
  }
}
