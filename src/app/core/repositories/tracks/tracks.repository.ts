import { TracksResponse } from '@core/models/jamendo/track.model';
import { InjectionToken, ResourceRef } from '@angular/core';

export const TRACKS_REPOSITORY = new InjectionToken<TracksRepository>('TRACKS_REPOSITORY');

export interface TracksRepository {
  readonly tracks: ResourceRef<TracksResponse | undefined>;
  search(query: string): void;
}
