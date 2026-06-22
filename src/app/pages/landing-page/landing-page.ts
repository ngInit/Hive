import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { JamendoService } from '@core/services/jamendo.service';
import { TagsPanel } from '@components/tags-panel/tags-panel';
import { Carousel } from '@components/carousel/carousel';
import { TrackCard } from '@components/track-card/track-card';
import { Track } from '@core/models/jamendo/tracks.model';
import { Album } from '@core/models/jamendo/albums.model';

@Component({
  selector: 'hive-landing-page',
  imports: [TagsPanel, Carousel, TrackCard],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage implements OnInit {
  readonly jamendoService = inject(JamendoService);
  readonly popularTracks = signal<Track[]>([]);
  readonly newReleases = signal<Track[]>([]);
  readonly newAlbums = signal<Album[]>([]);
  readonly isLoading = signal(false);

  ngOnInit() {
    void this.jamendoService.getLandingPage().then((response) => {
      this.popularTracks.set(response.popularSongs);
      this.newReleases.set(response.newReleases);
      this.newAlbums.set(response.newAlbums);
    });
  }
}
