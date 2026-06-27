import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);

  async goToArtist(id: string | undefined): Promise<void> {
    if (id) {
      await this.router.navigate(['/artist'], { queryParams: { q: id } });
    }
  }

  async goToAlbum(id: string | undefined): Promise<void> {
    if (id) {
      await this.router.navigate(['/album'], { queryParams: { q: id } });
    }
  }

  async goToTrack(id: string | undefined): Promise<void> {
    if (id) {
      await this.router.navigate(['/track'], { queryParams: { q: id } });
    }
  }
}
