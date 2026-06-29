import { Component, AfterViewInit, inject, ViewChild, ElementRef, computed, signal } from '@angular/core';
import { PlayerService } from '@core/services/player.service';
import { TrackDurationShortPipe } from '@shared/pipes/track-duration-short-pipe';
import { MatIcon } from '@angular/material/icon';
import { Track } from '@core/models/jamendo/tracks.model';

@Component({
  selector: 'hive-player',
  imports: [MatIcon, TrackDurationShortPipe],
  templateUrl: './player.html',
  styleUrl: './player.scss',
})
export class Player implements AfterViewInit {
  private readonly playerService = inject(PlayerService);
  private isPlayerLoaded = signal<boolean>(false);
  private loadedTrackId: string | null = null;
  readonly currentTrack = this.playerService.playingTrack;
  readonly currentTime = signal<number>(0);
  readonly duration = signal<number>(0);
  readonly isPlaying = this.playerService.isPlayingTrack;
  progressBarValue = signal<number>(0);
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

  volumeBackup = 0;
  isRepeat = false;
  isFavorite = false;

  @ViewChild('audioPlayer')
  audioElement: ElementRef<HTMLAudioElement> | undefined;

  ngAfterViewInit(): void {
    this.getPlayer().autoplay = false;
    this.getPlayer().volume = 0.25;
    this.getPlayer().loop = this.isRepeat;
    this.getPlayer().muted = false;
    this.getPlayer().preload = 'none';
    this.getPlayer().load();
    this.isPlayerLoaded.set(true);
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

  private loadTrack(track: Track): void {
    if (this.loadedTrackId !== track.id) {
      this.loadedTrackId = track.id;
      this.getPlayer().src = track.audio;
      this.resetData();
    }
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
    if (this.getPlayer().duration === 0 || !this.isPlaying()) {
      return;
    }
    const progress = Math.floor((this.getPlayer().currentTime / this.getPlayer().duration) * 100);
    this.progressBarValue.set(progress);
    this.currentTime.set(Math.ceil(this.getPlayer().currentTime));
  }

  onLoadedMetadata(): void {
    this.duration.set(Math.ceil(this.getPlayer().duration));
  }

  playPause(): void {
    if (this.playerService.isPlayingTrack()) {
      this.playerService.pauseTrack();
    } else {
      this.playerService.resumeTrack();
    }
  }

  async play(): Promise<void> {
    try {
      await this.getPlayer().play();
    } catch (error) {
      this.resetData();
      console.error('Playback failed:', error);
    }
  }

  pause(): void {
    this.getPlayer().pause();
  }

  prevTrack(): void {
    this.playerService.prevTrack();
  }

  nextTrack(): void {
    this.playerService.nextTrack();
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
