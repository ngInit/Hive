import { TRACKS_REPOSITORY } from '@core/repositories/tracks/tracks.repository';
import { Injectable, inject, ResourceRef } from '@angular/core';
import { TracksResponse } from '@core/models/jamendo/tracks.model';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private readonly repository = inject(TRACKS_REPOSITORY);

  readonly tracks: ResourceRef<TracksResponse | undefined> = this.repository.tracks;

  searchTracks(query: string): void {
    this.repository.search(query);
  }
}
