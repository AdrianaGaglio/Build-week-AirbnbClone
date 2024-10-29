import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const currentUser = this.authSvc.auth.currentUser;

    // Verifica se c'è un utente loggato
    if (currentUser) {
      // Ottieni il token dell'utente e lo aggiunge all'header di autorizzazione
      return from(currentUser.getIdToken()).pipe(
        switchMap((token) => {
          const newRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(newRequest);
        })
      );
    }

    // Se non c'è un utente loggato, continua senza token
    return next.handle(request);
  }
}
