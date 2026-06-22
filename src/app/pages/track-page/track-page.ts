import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from '@core/models/jamendo/tracks.model';
import { JamendoService } from '@core/services/jamendo.service';

@Component({
  selector: 'hive-track-page',
  imports: [],
  templateUrl: './track-page.html',
  styleUrl: './track-page.scss',
})
export class TrackPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly jamendoService = inject(JamendoService);
  private readonly trackId = signal<string>('');
  readonly track = signal<Track | null>(null);

  ngOnInit(): void {
    const queryId = String(this.route.snapshot.queryParamMap.get('q'));
    this.trackId.set(queryId);
    void this.jamendoService.getTrackPage(this.trackId()).then((response) => {
      this.track.set(response.track);
    });
  }
}
