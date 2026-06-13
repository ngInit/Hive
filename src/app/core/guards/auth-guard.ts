import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { effect, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const redirect = () => router.createUrlTree(['/']);

  return new Promise<boolean | UrlTree>((resolve) => {
    if (authService.isAuthReady()) {
      resolve(authService.isAuthenticated() ? true : redirect());
      return;
    }
    const refEffect = effect(() => {
      if (authService.isAuthReady()) {
        refEffect.destroy();
        resolve(authService.isAuthenticated() ? true : redirect());
      }
    });
  });
};
