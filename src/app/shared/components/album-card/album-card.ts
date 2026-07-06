import { Component, inject, input } from '@angular/core';
import { NavigationService } from '@core/services/navigation.service';
import { Album } from '@core/models/jamendo/albums.model';

@Component({
  selector: 'hive-album-card',
  templateUrl: './album-card.html',
  styleUrl: './album-card.scss',
})
export class AlbumCard {
  private readonly navigationService = inject(NavigationService);
  readonly album = input.required<Album>();

  async goToArtist(): Promise<void> {
    await this.navigationService.goToArtist(this.album().artist_id);
  }

  async goToAlbum(): Promise<void> {
    await this.navigationService.goToAlbum(this.album().id);
  }
}
