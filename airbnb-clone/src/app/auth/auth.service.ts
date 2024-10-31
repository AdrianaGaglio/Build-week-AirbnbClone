import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
  authState,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { iUser } from '../interfaces/iuser';
import { iLoginData } from '../interfaces/ilogindata';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth = inject(Auth);
  authState$ = new BehaviorSubject<User | null>(null);
  authStateOb$ = <Observable<User | null>>authState(this.auth);
  isLoggedIn$ = this.authStateOb$.pipe(
    map((user) => {
      const isLoggedIn = !!user;

      return isLoggedIn;
    })
  );
  isRegistering = false;

  constructor(private firestore: Firestore, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      console.log('Stato di autenticazione rilevato:', user);
      if (!this.isRegistering) {
        this.authState$.next(user);
      }
    });
  }

  register(user: Partial<iUser>) {
    this.isRegistering = true;
    if (!user.email || !user.password) {
      return throwError(() => new Error('Email e password sono richiesti'));
    }

    return from(
      createUserWithEmailAndPassword(this.auth, user.email, user.password)
    ).pipe(
      switchMap((userCredential) => {
        const uid = userCredential.user.uid;

        const userDocRef = doc(this.firestore, `users/${uid}`);
        return from(
          setDoc(userDocRef, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImg: user.profileImg || '',
            role: user.role || 'guest',
            num_of_apartments: user.num_of_apartments || 0,
            ratings: user.ratings || { vote: 0, count: 0 },
            reviews: user.reviews || [],
          })
        );
      }),
      catchError((error) => {
        console.error('Errore durante la registrazione:', error);
        return throwError(() => new Error('Errore nella registrazione'));
      })
    );
  }

  login(user: iLoginData) {
    return from(
      signInWithEmailAndPassword(this.auth, user.email, user.password)
    ).pipe(
      map((userCredential) => {
        this.authState$.next(userCredential.user); // Aggiorna lo stato dell'autenticazione

        return userCredential.user;
      }),
      catchError((error) => {
        let message = '';
        if (error.code === 'auth/user-not-found') {
          message = 'Utente non trovato';
        } else if (error.code === 'auth/wrong-password') {
          message = 'Password errata';
        } else if (error.code === 'auth/invalid-credential') {
          message = 'Credenziali errate';
        } else {
          message = 'Errore nella richiesta';
        }
        return throwError(() => new Error(message));
      })
    );
  }

  logout() {
    return from(signOut(this.auth)).pipe(
      map(() => {
        console.log('Logout effettuato');

        this.authState$.next(null); // Resetta lo stato dell'utente
        this.router.navigate(['/auth/login']); // Naviga alla pagina di login
      })
    );
  }
}
