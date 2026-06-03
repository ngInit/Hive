import { Routes } from '@angular/router';
import { LandingPage } from '@pages/landing-page/landing-page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    title: 'Hive',
  },
  {
    path: 'user',
    loadComponent: () => import('@pages/user-page/user-page').then((page) => page.UserPage),
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
