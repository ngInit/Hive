import { Component, AfterViewInit, ViewChild, ElementRef, computed, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Track } from '@core/models/jamendo/tracks.model';
import { tracksMock } from '@shared/mocks/tracks.mock';

@Component({
  selector: 'hive-player',
  imports: [MatIcon],
  templateUrl: './player.html',
  styleUrl: './player.scss',
})
export class Player implements AfterViewInit {
  private readonly selectedUrl = `https://prod-1.storage.jamendo.com/?trackid=2179454&format=mp31&from=BTco%2FHLwKM129vrjHY%2FmBA%3D%3D%7ClUdnmKMx%2BA%2B8nyJfLCtSkg%3D%3D`;

  progressBarValue = 0;
  readonly tracks: Track[] = tracksMock.results;
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
  isMuted = false;
  isRepeat = false;
  isFavorite = false;

  @ViewChild('audioPlayer')
  audioElement: ElementRef<HTMLAudioElement> | undefined;

  ngAfterViewInit(): void {
    this.getPlayer().src = this.selectedUrl;
    this.getPlayer().autoplay = false;
    this.getPlayer().controls = true;
    this.getPlayer().volume = 0.25;
    this.getPlayer().loop = this.isRepeat;
    this.getPlayer().muted = this.isMuted;
    this.getPlayer().preload = 'none';
  }

  private getPlayer(): HTMLAudioElement {
    if (this.audioElement === undefined) {
      throw new Error('Audio element is undefined');
    }
    return this.audioElement.nativeElement;
  }

  playProgress(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const progressBar = event.target;
      this.progressBarValue = Number(progressBar.value);
      console.log('track progress: ', progressBar.value);
      // this.getPlayer().currentTime = this.getPlayer().duration * (progress / 100);
    }
  }

  volumeProgress(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const volumeBar = event.target;
      this.volumeBarValue.set(Number(volumeBar.value));
      this.volumeBackup = 0;
      this.isMuted = false;
      console.log('volume: ', volumeBar.value);
    }
  }

  playPause(): void {
    if (!this.isPlaying) {
      this.isPlaying = true;
      // try {
      //   await this.getPlayer().play();
      // } catch (err) {
      //   console.error('Playback failed:', err);
      // }
      console.log('play');
    } else {
      // this.getPlayer().pause();
      this.isPlaying = false;
      console.log('pause');
    }
  }

  prevTrack(): void {
    console.log('prevTrack');
  }

  nextTrack(): void {
    console.log('nextTrack');
  }

  mute(): void {
    if (!this.isMuted) {
      this.volumeBackup = this.volumeBarValue();
      this.volumeBarValue.set(0);
    } else {
      this.volumeBarValue.set(this.volumeBackup);
      this.volumeBackup = 0;
    }
    this.isMuted = !this.isMuted;
    // this.getPlayer().muted = this.isMuted;
  }

  repeat(): void {
    this.isRepeat = !this.isRepeat;
    // this.getPlayer().loop = true;
    console.log('repeat', this.isRepeat);
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
