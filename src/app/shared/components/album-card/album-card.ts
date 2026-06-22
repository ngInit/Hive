import { Component, input } from '@angular/core';
import { Album } from '@core/models/jamendo/albums.model';

@Component({
  selector: 'hive-album-card',
  templateUrl: './album-card.html',
  styleUrl: './album-card.scss',
})
export class AlbumCard {
  readonly album = input.required<Album>();
}
