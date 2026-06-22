import { environment } from '@env/environment';
import { AUTH_REPOSITORY } from '@core/repositories/auth/auth.repository';
import { JAMENDO_REPOSITORY } from '@core/repositories/jamendo/jamendo.repository';
import { MockAuthRepository } from '@core/repositories/auth/mock-auth.repository';
import { FirebaseAuthRepository } from '@core/repositories/auth/firebase-auth.repository';
import { JamendoMockRepository } from '@core/repositories/jamendo/jamendo-mock.repository';
import { JamendoDbRepository } from '@core/repositories/jamendo/jamendo-db.repository';

export function provideAuthRepository() {
  return {
    provide: AUTH_REPOSITORY,
    useClass: environment.enableMockData ? MockAuthRepository : FirebaseAuthRepository,
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
