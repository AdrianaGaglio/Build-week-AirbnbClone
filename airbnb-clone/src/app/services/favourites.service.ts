import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iFavourite } from '../interfaces/ifavourite';
import { iApartment } from '../interfaces/iapartment';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  constructor(private http: HttpClient) {}

  favouritesUrl = environment.favouritesUrl;

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

  getFavouritesByUserId(id: number): Observable<iApartment[]> {
    return this.http
      .get<iFavourite>(`${this.favouritesUrl}/${id}`)
      .pipe(map((Userfavourite) => Userfavourite.apartments))
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
    userId: number,
    apartment: iApartment
  ): Observable<iFavourite> {
    return this.getFavourites()
      .pipe(
        switchMap((favourites: iFavourite[]) => {
          // controllo se l'utente esiste già
          let userFav = favourites.find(
            (favourite: iFavourite) => favourite.id === userId
          );
          // se non esiste, faccio una post con un nuovo oggetto creato al momento
          if (!userFav) {
            let newFav: iFavourite = { id: userId, apartments: [apartment] };
            return this.http.post<iFavourite>(this.favouritesUrl, newFav);
          }
          // se esiste, aggiungo il movie all'array dell'utente e faccio una put
          let favFound = userFav.apartments.find(
            (userApartment: iApartment) => userApartment.id === apartment.id
          );
          if (!favFound) {
            userFav.apartments.push(apartment);
          } else {
            alert('Appartmento già aggiunto');
          }
          return this.http.put<iFavourite>(
            `${this.favouritesUrl}/${userId}`,
            userFav
          );
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

  checkIfPresent(userId: number, apartment: iApartment): Observable<boolean> {
    return this.getFavouritesByUserId(userId).pipe(
      map((apartments: iApartment[]) => {
        if (apartments && apartments.length > 0) {
          let found = apartments.find(
            (userApartment) => userApartment.id === apartment.id
          );
          if (found) {
            return true;
          }
          return false;
        }
        return false;
      })
    );
  }
}
