import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { iUser } from '../interfaces/iuser';
import { iReview } from '../interfaces/ireview';
import { docData, Firestore } from '@angular/fire/firestore';
import { doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  userUrl: string = environment.userUrl;

  getUserById(id: string): Observable<iUser> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, { idField: 'id' }).pipe(
      map((data) => {
        console.log(data);

        return data as iUser;
      }),
      catchError((error) => {
        console.error('Errore Firestore:', error); // Logga l'errore completo
        let message = '';
        if (error.code === 'not-found') {
          message = 'Utente non trovato';
        } else {
          message = 'Errore nella richiesta';
        }
        return throwError(() => new Error(message));
      })
    );
  }

  getReviewByUserId(id: string): Observable<iReview[]> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef).pipe(
      map((userData: any) => userData.reviews as iReview[]), // Assumiamo che le recensioni siano salvate come array nel documento utente
      catchError((error) => {
        let message = '';
        if (error.code === 'not-found') {
          message = 'Utente non trovato';
        } else {
          message = 'Errore nella richiesta';
        }
        return throwError(() => new Error(message));
      })
    );
  }

  changeUserInfo(user: iUser): Observable<void> {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return from(updateDoc(userDocRef, { ...user })).pipe(
      catchError((error) => {
        let message = '';
        if (error.code === 'not-found') {
          message = 'Utente non trovato';
        } else {
          message = 'Errore nella richiesta';
        }
        return throwError(() => new Error(message));
      })
    );
  }
}
