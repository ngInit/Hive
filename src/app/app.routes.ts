import { Routes } from '@angular/router';
import { LandingPage } from '@pages/landing-page/landing-page';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    title: 'Hive',
  },
  {
    path: 'user',
    loadComponent: () => import('@pages/user-page/user-page').then((page) => page.UserPage),
    title: 'Profile',
    canActivate: [authGuard],
    data: { pageTitle: 'Profile' },
  },
  {
    path: 'about',
    loadComponent: () => import('@pages/about-page/about-page').then((page) => page.AboutPage),
    title: 'About',
  },
  {
    path: '**',
    loadComponent: () => import('@pages/error-page/error-page').then((page) => page.ErrorPage),
    title: 'Error',
  },
];
