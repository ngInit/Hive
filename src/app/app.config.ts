import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideRepositories } from '@core/providers/repository.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withXhr()),
    ...provideRepositories(),
  ],
};
