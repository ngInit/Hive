import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment';
import { throwJamendoResponseError } from '@core/errors/jamendo-http.error';
import { catchError, throwError } from 'rxjs';

export const jamendoLoggingInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith(environment.jamendoApiUrl)) {
    return next(request);
  }

  const isNotProduction = !environment.production;
  const logStart = `[HTTP] - ${request.method} ${request.urlWithParams}`;

  if (isNotProduction) {
    console.log(logStart);
  }

  return next(request).pipe(
    catchError((error: unknown) => {
      if (isNotProduction) {
        console.error(logStart, error);
      }
      return throwError(() => {
        return throwJamendoResponseError(error);
      });
    })
  );
};
