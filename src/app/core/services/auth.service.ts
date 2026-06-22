import { Injectable, signal, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  isAuthenticated = signal(this.hasToken());

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.setAuthStatus();
      });
  }

  private hasToken(): boolean {
    return !!sessionStorage.getItem('hive_token');
  }

  logIn(): void {
    sessionStorage.setItem('hive_token', '1');
    this.setAuthStatus();
  }

  logOut(): void {
    sessionStorage.removeItem('hive_token');
    this.setAuthStatus();
  }

  setAuthStatus(): void {
    this.isAuthenticated.set(this.hasToken());
  }

  isLoggedIn(): boolean {
    this.setAuthStatus();
    return this.isAuthenticated();
  }
}
