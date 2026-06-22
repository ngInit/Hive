import { environment } from '@env/environment';
import { AUTH_REPOSITORY } from '@core/repositories/firebase/firebase.repository';
import { JAMENDO_REPOSITORY } from '@core/repositories/jamendo/jamendo.repository';
import { FirebaseMockRepository } from '@core/repositories/firebase/firebase-mock.repository';
import { FirebaseAuthRepository } from '@core/repositories/firebase/firebase-auth.repository';
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

export function provideRepositories() {
  return [provideJamendoRepository(), provideAuthRepository()];
}
