import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { iUser } from '../interfaces/iuser';
import { iReview } from '../interfaces/ireview';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  userUrl: string = environment.userUrl;

  getUserById(id: number): Observable<iUser> {
    return this.http.get<iUser>(`${this.userUrl}/${id}`).pipe(
      catchError((error) => {
        return throwError(() => {
          let message = '';
          if (error.status >= 400 && error.status < 500) {
            message = 'Utente non trovato';
          } else if (error.status === 500) {
            message = 'Errore nella richiesta';
          }
          return message;
        });
      })
    );
  }

  getReviewByUserId(id: number): Observable<iReview[]> {
    return this.http
      .get<iUser>(`${this.userUrl}/${id}`)
      .pipe(map((user: iUser) => user.reviews))
      .pipe(
        catchError((error) => {
          return throwError(() => {
            let message = '';
            if (error.status >= 400 && error.status < 500) {
              message = 'Utente non trovato';
            } else if (error.status === 500) {
              message = 'Errore nella richiesta';
            }
            return message;
          });
        })
      );
  }

  changeUserInfo(user: iUser): Observable<iUser> {
    return this.http.put<iUser>(`${this.userUrl}/${user.id}`, user).pipe(
      catchError((error) => {
        return throwError(() => {
          let message = '';
          if (error.status >= 400 && error.status < 500) {
            message = 'Utente non trovato';
          } else if (error.status === 500) {
            message = 'Errore nella richiesta';
          }
          return message;
        });
      })
    );
  }
}
