import { computed, Injectable, signal } from '@angular/core';
import { Track } from '@core/models/jamendo/tracks.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly trackList = signal<Track[]>([]);
  private readonly currentTrackIndex = signal<number>(0);
  private readonly isPlaying = signal<boolean>(false);
  readonly isPlayingTrack = this.isPlaying.asReadonly();
  readonly playingTrack = computed<Track | null>(() => {
    const tracks = this.trackList();
    const index = this.currentTrackIndex();
    return tracks[index] ?? null;
  });
  readonly hasNextTrack = computed(() => {
    return this.currentTrackIndex() < this.trackList().length - 1;
  });
  readonly hasPreviousTrack = computed(() => {
    return this.currentTrackIndex() > 0;
  });

  playCollection(tracks: Track[]): void {
    if (tracks.length === 0) {
      return;
    }
    this.trackList.set(tracks);
    this.currentTrackIndex.set(0);
    this.isPlaying.set(true);
  }

  playTrack(track: Track): void {
    this.playCollection([track]);
  }

  pauseTrack(): void {
    this.isPlaying.set(false);
  }

  resumeTrack(): void {
    this.isPlaying.set(true);
  }

  toggle(track: Track): void {
    const isTheSameTrack = this.playingTrack()?.id === track.id;
    if (!isTheSameTrack) {
      this.playTrack(track);
      return;
    }
    if (this.isPlaying()) {
      this.pauseTrack();
    } else {
      this.resumeTrack();
    }
  }
}
