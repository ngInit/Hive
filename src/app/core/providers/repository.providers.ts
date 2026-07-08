import { environment } from '@env/environment';
import { AUTH_REPOSITORY } from '@core/repositories/firebase/firebase.repository';
import { JAMENDO_REPOSITORY } from '@core/repositories/jamendo/jamendo.repository';
import { PLAYLIST_REPOSITORY } from '@core/repositories/firestore/playlist.repository';
import { FirebaseMockRepository } from '@core/repositories/firebase/firebase-mock.repository';
import { FirebaseAuthRepository } from '@core/repositories/firebase/firebase-auth.repository';
import { FirestorePlaylistRepository } from '@core/repositories/firestore/firestore-playlist.repository';
import { JamendoMockRepository } from '@core/repositories/jamendo/jamendo-mock.repository';
import { JamendoDbRepository } from '@core/repositories/jamendo/jamendo-db.repository';

export function provideAuthRepository() {
  return {
    provide: AUTH_REPOSITORY,
    useClass: environment.enableMockData ? FirebaseMockRepository : FirebaseAuthRepository,
  };
}

export function provideJamendoRepository() {
  return {
    provide: JAMENDO_REPOSITORY,
    useClass: environment.enableMockData ? JamendoMockRepository : JamendoDbRepository,
  };
}

export function providePlaylistRepository() {
  return {
    provide: PLAYLIST_REPOSITORY,
    useClass: FirestorePlaylistRepository,
  };
}

export function provideRepositories() {
  return [provideJamendoRepository(), provideAuthRepository(), providePlaylistRepository()];
}
