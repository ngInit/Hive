import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { JamendoService } from '@core/services/jamendo.service';
import { Carousel } from '@components/carousel/carousel';
import { TrackCard } from '@components/track-card/track-card';
import { AlbumCard } from '@components/album-card/album-card';
import { Track } from '@core/models/jamendo/tracks.model';
import { Album } from '@core/models/jamendo/albums.model';

@Component({
  selector: 'hive-home-page',
  imports: [Carousel, TrackCard, AlbumCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  readonly jamendoService = inject(JamendoService);
  readonly popularTracks = signal<Track[]>([]);
  readonly newReleases = signal<Track[]>([]);
  readonly newAlbums = signal<Album[]>([]);
  readonly isLoading = signal(false);

  ngOnInit() {
    this.isLoading.set(true);
    void this.jamendoService
      .getLandingPage()
      .then((response) => {
        this.popularTracks.set(response.popularSongs);
        this.newReleases.set(response.newReleases);
        this.newAlbums.set(response.newAlbums);
        this.isLoading.set(false);
      })
      .then(() => {
        this.isLoading.set(false);
      });
  }
}
