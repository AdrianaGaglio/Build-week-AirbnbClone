import { iApartment } from './../interfaces/iapartment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  constructor(private http: HttpClient) {}

  getApartments() {
    return this.http.get<iApartment[]>('http://localhost:3000/apartments').pipe(
      catchError((error) => {
        return throwError(() => {
          let message = '';
          if (error.status >= 400 && error.status < 500) {
            message = 'Appartamenti non trovati';
          } else if (error.status === 500) {
            message = 'Errore nella richiesta';
          }
          return message;
        });
      })
    );
  }

  getApartmentById(id: number) {
    return this.http
      .get<iApartment>(`http://localhost:3000/apartments/${id}`)
      .pipe(
        catchError((error) => {
          return throwError(() => {
            let message = '';
            if (error.status >= 400 && error.status < 500) {
              message = 'Appartamento non trovato';
            } else if (error.status === 500) {
              message = 'Errore nella richiesta';
            }
            return message;
          });
        })
      );
  }

  addApartament(apartament: Partial<iApartment>) {
    return this.http.post('http://localhost:3000/apartments', apartament).pipe(
      catchError((error) => {
        return throwError(() => {
          let message = '';
          if (error.status >= 400 && error.status < 500) {
            message = 'Non trovato';
          } else if (error.status === 500) {
            message = 'Errore nella richiesta';
          }
          return message;
        });
      })
    );
  }

  getApartmentsByUser(userId: number) {
    return this.http
      .get<iApartment[]>('http://localhost:3000/apartments/')
      .pipe(
        map((apartments) => {
          return apartments.filter((apartment) => apartment.hostId === userId);
        })
      )
      .pipe(
        catchError((error) => {
          return throwError(() => {
            let message = '';
            if (error.status >= 400 && error.status < 500) {
              message = 'Appartamento non trovato';
            } else if (error.status === 500) {
              message = 'Errore nella richiesta';
            }
            return message;
          });
        })
      );
  }
}
