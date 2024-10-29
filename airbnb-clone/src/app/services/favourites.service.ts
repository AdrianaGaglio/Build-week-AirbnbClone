import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iFavourite } from '../interfaces/ifavourite';
import { iApartment } from '../interfaces/iapartment';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  constructor(private http: HttpClient) {}

  favouritesUrl = environment.favouritesUrl;
  userFavourites$ = new BehaviorSubject<iApartment[] | null>([]);

  getFavourites(): Observable<iFavourite[]> {
    return this.http.get<iFavourite[]>(this.favouritesUrl).pipe(
      catchError((error) => {
        return throwError(() => {
          let message = '';
          if (error.status >= 400 && error.status < 500) {
            message = 'Preferiti non trovati';
          } else if (error.status === 500) {
            message = 'Errore nella richiesta';
          }
          return message;
        });
      })
    );
  }

  getFavouritesByUserId(userId: string): Observable<iApartment[]> {
    return this.getFavourites()
      .pipe(
        map((favourites) =>
          favourites.find((favourite) => favourite.userId === userId)
        )
      )
      .pipe(
        map((favourite) => {
          if (favourite) {
            return favourite.apartments;
          } else {
            return [];
          }
        })
      )
      .pipe(
        catchError((error) => {
          return throwError(() => {
            let message = '';
            if (error.status >= 400 && error.status < 500) {
              message = 'Nessun preferito trovato';
            } else if (error.status === 500) {
              message = 'Errore nella richiesta';
            }
            return message;
          });
        })
      );
  }

  addToFavourite(
    userId: string,
    apartment: iApartment
  ): Observable<iFavourite> {
    return this.getFavourites().pipe(
      switchMap((favourites: iFavourite[]) => {
        // Controllo se l'utente esiste già
        let userFav = favourites.find(
          (favourite: iFavourite) => favourite.userId === userId
        );

        if (!userFav) {
          // Aggiungi userId come proprietà dell'oggetto invece di sovrascrivere `id`
          let newFav: iFavourite = { userId, apartments: [apartment] };
          return this.http.post<iFavourite>(this.favouritesUrl, newFav);
        }

        let favFound = userFav.apartments.find(
          (userApartment: iApartment) => userApartment.id === apartment.id
        );

        if (!favFound) {
          userFav.apartments.push(apartment);
        } else {
          alert('Appartamento già aggiunto');
        }

        return this.http.put<iFavourite>(
          `${this.favouritesUrl}/${userFav.id}`,
          userFav
        );
      }),
      catchError((error) => {
        return throwError(() => {
          let message = '';
          if (error.status >= 400 && error.status < 500) {
            message = 'Nessun preferito trovato';
          } else if (error.status === 500) {
            message = 'Errore nella richiesta';
          }
          return message;
        });
      })
    );
  }

  // checkIfPresent(userId: number, apartment: iApartment): Observable<boolean> {
  //   return this.getFavouritesByUserId(userId).pipe(
  //     map((apartments: iApartment[]) => {
  //       if (apartments && apartments.length > 0) {
  //         let found = apartments.find(
  //           (userApartment) => userApartment.id === apartment.id
  //         );
  //         if (found) {
  //           return true;
  //         }
  //         return false;
  //       }
  //       return false;
  //     })
  //   );
  // }
}
