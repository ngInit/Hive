import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@env/environment';

export const jamendoParamsInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith(environment.jamendoApiUrl)) {
    return next(request);
  }

  let params = request.params;
  if (!params.has('client_id')) {
    params = params.set('client_id', environment.jamendoClientId);
  }
  if (!params.has('format')) {
    params = params.set('format', 'json');
  }
  return next(request.clone({ params }));
};
