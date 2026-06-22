import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink, isActive } from '@angular/router';
import { FirebaseService } from '@core/services/firebase.service';
import { JamendoService } from '@core/services/jamendo.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, from, of, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Popup } from '@components/popup/popup';
import { Artist } from '@core/models/jamendo/artists.model';
import { Album } from '@core/models/jamendo/albums.model';
import { Track } from '@core/models/jamendo/tracks.model';

@Component({
  selector: 'hive-header',
  imports: [RouterLink, NgTemplateOutlet, FormsModule, MatButton, MatIconButton, MatIcon, Popup],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly router = inject(Router);
  protected readonly firebaseService = inject(FirebaseService);
  private readonly jamendoService = inject(JamendoService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchQuery$ = new Subject<string>();
  protected searchInput = '';
  readonly isSign = isActive('/sign', this.router);
  readonly suggestions = signal<{
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }>({ artists: [], albums: [], tracks: [] });
  readonly hasSuggestions = computed(() => {
    return (
      this.suggestions().artists.length > 0 ||
      this.suggestions().albums.length > 0 ||
      this.suggestions().tracks.length > 0
    );
  });
  isPopupOpened = signal(false);

  constructor() {
    this.searchQuery$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          const search = query.trim();
          if (!search) {
            return of({ artists: [], albums: [], tracks: [] });
          }
          return from(this.jamendoService.getSuggestions(search));
        }),
        catchError(() => of({ artists: [], albums: [], tracks: [] })),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((response) => {
        this.suggestions.set(response);
      });
  }

  async signOut(): Promise<void> {
    await this.firebaseService.signOut();
    if (this.router.url === '/user') {
      await this.router.navigate(['/']);
    }
  }

  openPopup() {
    this.isPopupOpened.update((state) => !state);
  }

  search(query: string): void {
    this.searchQuery$.next(query);
  }

  async goToSearchPage(): Promise<void> {
    this.searchInput = this.searchInput.trim();
    if (!this.searchInput) {
      return;
    }
    await this.router.navigate(['/search'], { queryParams: { q: this.searchInput } });
  }

  clearSearch(): void {
    this.searchInput = '';
    this.suggestions.set({ artists: [], albums: [], tracks: [] });
    this.search('');
  }
}
