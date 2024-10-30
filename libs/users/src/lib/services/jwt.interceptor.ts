import { HttpInterceptorFn } from '@angular/common/http';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@env/environment.development';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwToken');
  const isAPIUrl = req.url.startsWith(environment.apiUrl);

  if (token && isAPIUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
