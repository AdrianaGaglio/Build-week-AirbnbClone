import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const data = this.authSvc.authResponse$.getValue();
    if (data) {
      const newrequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });

      return next.handle(newrequest);
    }

    return next.handle(request);
  }
}
