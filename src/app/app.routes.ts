import { Routes } from '@angular/router';
import { LandingPage } from '@pages/landing-page/landing-page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
    title: 'Hive',
  },
  {
    path: '**',
    loadComponent: () => import('@pages/error-page/error-page').then((page) => page.ErrorPage),
    title: 'Error',
  },
];
