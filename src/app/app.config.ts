import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import { jamendoLoggingInterceptor } from '@core/interceptors/jamendo-logging.interceptor';
import { jamendoParamsInterceptor } from '@core/interceptors/jamendo-params.interceptor';
import { provideRepositories } from '@core/providers/repository.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions(), withPreloading(PreloadAllModules)),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([jamendoParamsInterceptor, jamendoLoggingInterceptor]), withXhr()),
    ...provideRepositories(),
  ],
};
