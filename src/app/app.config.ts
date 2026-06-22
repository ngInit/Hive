import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { provideRepositories } from '@core/providers/repository.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions(), withPreloading(PreloadAllModules)),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withXhr()),
    ...provideRepositories(),
  ],
};
