import { Injectable, signal } from '@angular/core';
import { Track } from '@core/models/jamendo/tracks.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly currentTrackId = signal<number | null>(null);
  private readonly isPlaying = signal<boolean>(false);

  readonly playingTrackId = this.currentTrackId.asReadonly();
  readonly isPlayingTrack = this.isPlaying.asReadonly();

  playTrack(track: Track): void {
    this.currentTrackId.set(Number(track.id));
    this.isPlaying.set(true);
  }

  pauseTrack(): void {
    this.isPlaying.set(false);
  }

  toggle(track: Track): void {
    if (this.currentTrackId() === Number(track.id)) {
      this.pauseTrack();
    } else {
      this.playTrack(track);
    }
  }
}
