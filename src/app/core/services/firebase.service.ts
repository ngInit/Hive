import { Injectable, signal, inject, computed } from '@angular/core';
import { AUTH_REPOSITORY } from '@core/repositories/firebase/firebase.repository';
import { SignInData, SignUpData, UpdateData } from '@core/models/auth.model';
import { UserAuth } from '@core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private readonly repository = inject(AUTH_REPOSITORY);
  readonly currentUser = this.repository.currentUser;
  readonly error = signal<string | null>(null);
  readonly isLoading = signal(false);
  readonly isAuthReady = this.repository.isAuthReady;
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  async signIn(data: SignInData): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      await this.repository.signIn(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async signOut(): Promise<void> {
    this.error.set(null);
    try {
      const user = this.currentUser();
      if (user) {
        await this.repository.signOut(user);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(message);
    }
  }

  async signUp(data: SignUpData): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      await this.repository.signUp(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(message);
    } finally {
      this.isLoading.set(false);
    }
  }

  async updateUserData(uid: string, data: UpdateData): Promise<boolean> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      await this.repository.updateProfile(uid, data);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(message);
      return false;
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteUserData(data: UserAuth): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      await this.repository.deleteProfile(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.error.set(message);
    } finally {
      this.isLoading.set(false);
    }
  }
}
