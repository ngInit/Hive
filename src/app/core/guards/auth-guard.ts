import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { effect, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

function afterAuthIsReady(
  service: AuthService,
  response: () => boolean | UrlTree
): boolean | UrlTree | Promise<boolean | UrlTree> {
  if (service.isAuthReady()) {
    return response();
  }
  return new Promise((resolve) => {
    const refEffect = effect(() => {
      if (service.isAuthReady()) {
        refEffect.destroy();
        resolve(response());
      }
    });
  });
}

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return afterAuthIsReady(authService, () => {
    return authService.isAuthenticated() ? router.createUrlTree(['/']) : true;
  });
};

export const userGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return afterAuthIsReady(authService, () => {
    return authService.isAuthenticated() ? true : router.createUrlTree(['/']);
  });
};
