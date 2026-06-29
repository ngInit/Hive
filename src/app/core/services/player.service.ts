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

  playCollection(tracks: Track[], startIndex = 0): void {
    if (tracks.length === 0) {
      return;
    }
    this.trackList.set(tracks);
    this.currentTrackIndex.set(startIndex);
    this.isPlaying.set(true);
  }

  pauseTrack(): void {
    this.isPlaying.set(false);
  }

  resumeTrack(): void {
    this.isPlaying.set(true);
  }

  nextTrack(): void {
    if (!this.hasNextTrack()) {
      return;
    }
    this.currentTrackIndex.update((index) => {
      return index + 1;
    });
    this.isPlaying.set(true);
  }

  prevTrack(): void {
    if (!this.hasPreviousTrack()) {
      return;
    }
    this.currentTrackIndex.update((index) => {
      return index - 1;
    });
    this.isPlaying.set(true);
  }

  toggle(track: Track, allTracks?: Track[] | null): void {
    const tracks = allTracks ?? [track];
    const index = tracks.findIndex((result) => result.id === track.id);
    const isTheSameTrack = this.playingTrack()?.id === track.id;
    if (!isTheSameTrack) {
      this.playCollection(tracks, index);
      return;
    }
    if (this.isPlaying()) {
      this.pauseTrack();
    } else {
      this.resumeTrack();
    }
  }
}
