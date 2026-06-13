import { SignInData, SignUpData, UpdateData } from '@core/models/auth.model';
import { InjectionToken, Signal } from '@angular/core';
import { UserAuth } from '@core/models/user.model';

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AUTH_REPOSITORY');

export interface AuthRepository {
  readonly currentUser: Signal<UserAuth | null>;
  readonly isAuthReady: Signal<boolean>;
  signIn(data: SignInData): Promise<UserAuth>;
  signOut(data: UserAuth): Promise<void>;
  signUp(data: SignUpData): Promise<UserAuth>;
  updateProfile(uid: string, data: UpdateData): Promise<UserAuth>;
}
