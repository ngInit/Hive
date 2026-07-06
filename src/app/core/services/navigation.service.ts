import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);

  async goHome(): Promise<void> {
    await this.router.navigate(['/']);
  }

  async goToSearch(query: string): Promise<void> {
    await this.router.navigate(['/search'], { queryParams: { q: query } });
  }

  async goToTagsSearch(query: string): Promise<void> {
    await this.router.navigate(['/tags'], { queryParams: { q: query } });
  }

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
