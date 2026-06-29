import { Component, AfterViewInit, ViewChild, ElementRef, computed, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Track } from '@core/models/jamendo/tracks.model';
import { tracksMock } from '@shared/mocks/tracks.mock';
import { TrackDurationShortPipe } from '@shared/pipes/track-duration-short-pipe';

@Component({
  selector: 'hive-player',
  imports: [MatIcon, TrackDurationShortPipe],
  templateUrl: './player.html',
  styleUrl: './player.scss',
})
export class Player implements AfterViewInit {
  private currentTrackIndex = signal<number>(0);
  readonly tracks: Track[] = tracksMock.results;
  readonly currentTrack = computed(() => {
    return this.tracks[this.currentTrackIndex()];
  });
  readonly currentTime = signal<number>(0);
  readonly duration = signal<number>(0);
  progressBarValue = signal<number>(0);
  volumeBackup = 0;
  volumeBarValue = signal<number>(0.25);
  volumeIcon = computed(() => {
    if (this.volumeBarValue() === 0) {
      return 'volume_off';
    } else if (this.volumeBarValue() < 0.3) {
      return 'volume_mute';
    } else if (this.volumeBarValue() < 0.7) {
      return 'volume_down';
    }
    return 'volume_up';
  });

  isPlaying = false;
  isRepeat = false;
  isFavorite = false;

  @ViewChild('audioPlayer')
  audioElement: ElementRef<HTMLAudioElement> | undefined;

  ngAfterViewInit(): void {
    this.loadTrack(0);
    this.getPlayer().autoplay = false;
    this.getPlayer().volume = 0.25;
    this.getPlayer().loop = this.isRepeat;
    this.getPlayer().muted = false;
    this.getPlayer().preload = 'none';
    this.getPlayer().load();
  }

  private getPlayer(): HTMLAudioElement {
    if (this.audioElement === undefined) {
      throw new Error('Audio element is undefined');
    }
    return this.audioElement.nativeElement;
  }

  private resetData(): void {
    this.getPlayer().currentTime = 0;
    this.duration.set(0);
    this.currentTime.set(0);
    this.progressBarValue.set(0);
  }

  private loadTrack(index: number): void {
    this.currentTrackIndex.set(index);
    this.getPlayer().src = this.currentTrack().audio;
    this.resetData();
  }

  playProgress(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const progressBar = event.target;
      this.progressBarValue.set(Number(progressBar.value));
      this.getPlayer().currentTime = Math.ceil(this.getPlayer().duration * (this.progressBarValue() / 100));
    }
  }

  volumeProgress(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const volumeBar = event.target;
      this.volumeBarValue.set(Number(volumeBar.value));
      this.getPlayer().volume = this.volumeBarValue();
      this.volumeBackup = 0;
      if (this.getPlayer().muted) {
        this.getPlayer().muted = false;
      }
    }
  }

  onTimeUpdate(): void {
    if (this.getPlayer().duration === 0 || !this.isPlaying) {
      return;
    }
    const progress = Math.floor((this.getPlayer().currentTime / this.getPlayer().duration) * 100);
    this.progressBarValue.set(progress);
    this.currentTime.set(Math.ceil(this.getPlayer().currentTime));
  }

  onLoadedMetadata(): void {
    this.duration.set(Math.ceil(this.getPlayer().duration));
  }

  async playPause(): Promise<void> {
    if (!this.isPlaying) {
      await this.play();
    } else {
      this.pause();
    }
  }

  async play(): Promise<void> {
    try {
      await this.getPlayer()
        .play()
        .then(() => {
          this.isPlaying = true;
        });
    } catch (error) {
      this.isPlaying = false;
      this.resetData();
      console.error('Playback failed:', error);
    }
  }

  pause(): void {
    this.getPlayer().pause();
    this.isPlaying = false;
  }

  async prevTrack(): Promise<void> {
    if (this.currentTrackIndex() <= 0) {
      return;
    }

    const wasPlaying = this.isPlaying;
    const prevIndex = this.currentTrackIndex() - 1;
    this.pause();
    this.loadTrack(prevIndex);

    if (wasPlaying) {
      await this.play();
    }
  }

  async nextTrack(): Promise<void> {
    if (this.currentTrackIndex() >= this.tracks.length - 1) {
      return;
    }
    const wasPlaying = this.isPlaying;
    const nextIndex = this.currentTrackIndex() + 1;
    this.pause();
    this.loadTrack(nextIndex);

    if (wasPlaying) {
      await this.play();
    }
  }

  mute(): void {
    if (!this.getPlayer().muted) {
      this.volumeBackup = this.volumeBarValue();
      this.volumeBarValue.set(0);
    } else {
      this.volumeBarValue.set(this.volumeBackup);
      this.volumeBackup = 0;
    }
    this.getPlayer().muted = !this.getPlayer().muted;
  }

  repeat(): void {
    this.isRepeat = !this.isRepeat;
    this.getPlayer().loop = this.isRepeat;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    console.log('favorite', this.isFavorite);
  }

  goToTrack(): void {
    console.log('goToTrack');
  }

  goToArtist(): void {
    console.log('goToArtist');
  }
}
