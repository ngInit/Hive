import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JamendoService } from '@core/services/jamendo.service';
import { Carousel } from '@components/carousel/carousel';
import { AlbumCard } from '@components/album-card/album-card';
import { TrackCard } from '@components/track-card/track-card';
import { Artist } from '@core/models/jamendo/artists.model';
import { Album } from '@core/models/jamendo/albums.model';
import { Track } from '@core/models/jamendo/tracks.model';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'hive-artist-page',
  imports: [MatIcon, Carousel, TrackCard, AlbumCard],
  templateUrl: './artist-page.html',
  styleUrl: './artist-page.scss',
})
export class ArtistPage {
  private readonly route = inject(ActivatedRoute);
  private readonly jamendoService = inject(JamendoService);
  readonly errorMessage = signal<string | null>(null);
  readonly isLoading = signal(false);
  readonly artist = signal<Artist | null>(null);
  readonly albums = signal<Album[] | null>(null);
  readonly tracks = signal<Track[] | null>(null);

  private readonly artistId = toSignal(
    this.route.queryParamMap.pipe(
      map((parameter) => {
        return parameter.get('q') ?? '';
      })
    ),
    {
      initialValue: '',
    }
  );

  constructor() {
    effect(() => {
      const id = this.artistId();
      if (!id) {
        this.clearData();
        this.isLoading.set(false);
        return;
      }
      this.loadPage(id);
    });
  }

  private clearData(): void {
    this.artist.set(null);
    this.albums.set(null);
    this.tracks.set(null);
    this.errorMessage.set(null);
  }

  private loadPage(id: string): void {
    this.isLoading.set(true);
    void this.jamendoService
      .getArtistPage(id)
      .then((response) => {
        this.artist.set(response.artist);
        this.albums.set(response.albums);
        this.tracks.set(response.tracks);
        this.isLoading.set(false);
      })
      .catch(() => {
        this.errorMessage.set(`Can't load this artist. Please try again later.`);
        this.isLoading.set(false);
      });
    this.clearData();
  }
}
