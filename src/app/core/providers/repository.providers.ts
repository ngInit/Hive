import { environment } from '@env/environment';
import { TRACKS_REPOSITORY } from '@core/repositories/tracks/tracks.repository';
import { MockTracksRepository } from '@core/repositories/tracks/mock-tracks.repository';
import { JamendoTracksRepository } from '@core/repositories/tracks/jamendo-tracks.repository';

export function provideTracksRepository() {
  return {
    provide: TRACKS_REPOSITORY,
    useClass: environment.enableMockData ? MockTracksRepository : JamendoTracksRepository,
  };
}

export function provideRepositories() {
  return [provideTracksRepository()];
}
