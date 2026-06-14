import { Routes } from '@angular/router';
import { MainLayout } from '@core/layouts/main-layout/main-layout';
import { LandingPage } from '@pages/landing-page/landing-page';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'sign',
    loadComponent: () => import('@core/layouts/sign-layout/sign-layout').then((page) => page.SignLayout),
    title: 'Sign',
    children: [
      {
        path: '',
        loadComponent: () => import('@pages/sign-page/sign-page').then((page) => page.SignPage),
      },
    ],
  },
  {
    path: '',
    component: MainLayout,
    children: [
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
    ],
  },
];
