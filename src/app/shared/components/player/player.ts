import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'hive-player',
  imports: [MatIcon],
  templateUrl: './player.html',
  styleUrl: './player.scss',
})
export class Player implements AfterViewInit {
  private readonly selectedUrl = `https://prod-1.storage.jamendo.com/?trackid=2179454&format=mp31&from=BTco%2FHLwKM129vrjHY%2FmBA%3D%3D%7ClUdnmKMx%2BA%2B8nyJfLCtSkg%3D%3D`;
  private readonly audioPlayer: ElementRef<HTMLAudioElement> | undefined;
  private currentTrack = 0;

  progressBarValue = 0;
  volumeBarValue = 0;

  @ViewChild('audioPlayer')
  audioElement: ElementRef<HTMLAudioElement> | undefined;

  ngAfterViewInit(): void {
    this.getPlayer().src = this.selectedUrl;
    this.getPlayer().autoplay = false;
    this.getPlayer().controls = true;
    this.getPlayer().volume = 0.25;
    this.getPlayer().loop = false;
    this.getPlayer().muted = false;
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
      console.log(progressBar.value);
      // this.getPlayer().currentTime = this.getPlayer().duration * (progress / 100);
    }
  }

  volumeProgress(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const volumeBar = event.target;
      this.volumeBarValue = Number(volumeBar.value);
      console.log(volumeBar.value);
    }
  }

  async play(): Promise<void> {
    try {
      await this.getPlayer().play();
    } catch (err) {
      console.error('Playback failed:', err);
    }
  }

  pause(): void {
    this.getPlayer().pause();
  }

  mute(): void {
    this.getPlayer().muted = true;
  }

  changeVolume(volume: number): void {
    this.getPlayer().volume = volume;
  }

  repeat(): void {
    this.getPlayer().loop = true;
  }
}
