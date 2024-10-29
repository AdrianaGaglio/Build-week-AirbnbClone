import { iApartment } from './../interfaces/iapartment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  constructor(private http: HttpClient) {}

  apartmentsUrl = environment.apartmentsUrl;

  apartments$ = new BehaviorSubject<iApartment[] | string>([]);

  getApartments(): Observable<iApartment[]> {
    return this.http.get<iApartment[]>(this.apartmentsUrl).pipe(
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

  getApartmentById(id: number): Observable<iApartment> {
    return this.http.get<iApartment>(`${this.apartmentsUrl}/${id}`).pipe(
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

  addApartament(apartament: Partial<iApartment>): Observable<iApartment> {
    return this.http.post<iApartment>(this.apartmentsUrl, apartament).pipe(
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

  getApartmentsByUser(userId: number): Observable<iApartment[]> {
    return this.http
      .get<iApartment[]>(this.apartmentsUrl)
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

  getCategories(): Observable<string[]> {
    return this.getApartments()
      .pipe(
        map((apartments: iApartment[]) => {
          let categories: string[] = [];
          apartments.forEach((apartment: iApartment) => {
            apartment.category.forEach((category: string) => {
              if (!categories.includes(category)) {
                categories.push(category);
              }
            });
          });
          return categories;
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

  getApartmentsByCategory(category: string): Observable<iApartment[]> {
    return this.getApartments()
      .pipe(
        map((apartments) =>
          apartments.filter((apartment) =>
            apartment.category.includes(category)
          )
        )
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

  getApartmentsBySearch(search: string): Observable<iApartment[]> {
    return this.getApartments().pipe(
      map((apartments) =>
        apartments.filter((apartment) =>
          apartment.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }
}
