import { environment } from '@env/environment';
import { AUTH_REPOSITORY } from '@core/repositories/auth/auth.repository';
import { TRACKS_REPOSITORY } from '@core/repositories/tracks/tracks.repository';
import { MockAuthRepository } from '@core/repositories/auth/mock-auth.repository';
import { FirebaseAuthRepository } from '@core/repositories/auth/firebase-auth.repository';
import { MockTracksRepository } from '@core/repositories/tracks/mock-tracks.repository';
import { JamendoTracksRepository } from '@core/repositories/tracks/jamendo-tracks.repository';

export function provideTracksRepository() {
  return {
    provide: TRACKS_REPOSITORY,
    useClass: environment.enableMockData ? MockTracksRepository : JamendoTracksRepository,
  };
}

export function provideAuthRepository() {
  return {
    provide: AUTH_REPOSITORY,
    useClass: environment.enableMockData ? MockAuthRepository : FirebaseAuthRepository,
  };
}

export function provideRepositories() {
  return [provideTracksRepository(), provideAuthRepository()];
}
