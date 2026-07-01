import { Component, inject, input } from '@angular/core';
import { NavigationService } from '@core/services/navigation.service';
import { Artist } from '@core/models/jamendo/artists.model';

@Component({
  selector: 'hive-artist-card',
  imports: [],
  templateUrl: './artist-card.html',
  styleUrl: './artist-card.scss',
})
export class ArtistCard {
  private readonly navigationService = inject(NavigationService);
  readonly artist = input.required<Artist>();

  goToArtist(id: string): void {
    void this.navigationService.goToArtist(id);
  }
}
