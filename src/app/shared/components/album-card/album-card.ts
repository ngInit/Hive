import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from '@core/models/jamendo/albums.model';

@Component({
  selector: 'hive-album-card',
  templateUrl: './album-card.html',
  styleUrl: './album-card.scss',
})
export class AlbumCard {
  private readonly router = inject(Router);
  readonly album = input.required<Album>();

  async goToArtist(): Promise<void> {
    await this.router.navigate(['/artist'], { queryParams: { q: this.album().artist_id } });
  }

  async goToAlbum(): Promise<void> {
    await this.router.navigate(['/album'], { queryParams: { q: this.album().id } });
  }
}
