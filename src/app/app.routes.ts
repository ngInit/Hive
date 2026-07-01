import { Routes } from '@angular/router';
import { MainLayout } from '@core/layouts/main-layout/main-layout';
import { LandingPage } from '@pages/landing-page/landing-page';
import { HomePage } from '@pages/home-page/home-page';
import { guestGuard, userGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'sign',
    loadComponent: () => import('@core/layouts/sign-layout/sign-layout').then((page) => page.SignLayout),
    title: 'Sign',
    canActivate: [guestGuard],
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
        children: [
          {
            path: '',
            component: HomePage,
            title: 'Hive',
          },
          {
            path: 'tags',
            loadComponent: () => import('@pages/tags-page/tags-page').then((page) => page.TagsPage),
            title: 'Tags',
          },
        ],
      },
      {
        path: 'user',
        loadComponent: () => import('@pages/user-page/user-page').then((page) => page.UserPage),
        title: 'Profile',
        canActivate: [userGuard],
        data: { pageTitle: 'Profile' },
      },
      {
        path: 'about',
        loadComponent: () => import('@pages/about-page/about-page').then((page) => page.AboutPage),
        title: 'About',
      },
      {
        path: 'track',
        loadComponent: () => import('@pages/track-page/track-page').then((page) => page.TrackPage),
        title: 'Track',
      },
      {
        path: 'search',
        loadComponent: () => import('@pages/search-page/search-page').then((page) => page.SearchPage),
        title: 'Search',
      },
      {
        path: '**',
        loadComponent: () => import('@pages/error-page/error-page').then((page) => page.ErrorPage),
        title: 'Error',
      },
    ],
  },
];
