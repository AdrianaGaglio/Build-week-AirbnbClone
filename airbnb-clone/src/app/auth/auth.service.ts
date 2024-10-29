import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import {
  BehaviorSubject,
  catchError,
  from,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { iUser } from '../interfaces/iuser';
import { iLoginData } from '../interfaces/ilogindata';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authState$ = new BehaviorSubject<User | null>(null);
  isLoggedIn$ = this.authState$.pipe(map((user) => !!user));

  constructor(
    public auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    onAuthStateChanged(this.auth, (user) => {
      this.authState$.next(user); // Aggiorna lo stato in base alla sessione Firebase
    });
  }

  register(user: Partial<iUser>) {
    if (!user.email || !user.password) {
      return throwError(() => new Error('Email e password sono richiesti'));
    }

    return from(
      createUserWithEmailAndPassword(this.auth, user.email!, user.password!)
    ).pipe(
      switchMap((userCredential) => {
        const uid = userCredential.user.uid;
        console.log('Utente creato con UID:', uid);

        const userDocRef = doc(this.firestore, `users/${uid}`);
        return from(
          setDoc(userDocRef, {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profileImg: user.profileImg || '',
            role: user.role || 'user',
            num_of_apartments: user.num_of_apartments || 0,
            ratings: user.ratings || { vote: 0, count: 0 },
            reviews: user.reviews || [],
          })
        ).pipe(
          map(() => console.log('Dati utente salvati in Firestore.')),
          catchError((error) => {
            console.error('Errore durante il salvataggio in Firestore:', error);
            return throwError(() => new Error('Errore nella registrazione'));
          })
        );
      })
    );
  }

  login(user: iLoginData) {
    return from(
      signInWithEmailAndPassword(this.auth, user.email, user.password)
        .then((userCredential) => {
          this.authState$.next(userCredential.user);
          localStorage.setItem(
            'loginData',
            JSON.stringify(userCredential.user)
          );
        })
        .catch((error) => {
          return throwError(() => {
            let message = '';
            if (error.code === 'auth/user-not-found') {
              message = 'Utente non trovato';
            } else if (error.code === 'auth/wrong-password') {
              message = 'Password errata';
            } else {
              message = 'Errore nella richiesta';
            }
            return new Error(message);
          });
        })
    );
  }

  logout() {
    signOut(this.auth).then(() => {
      this.authState$.next(null);
      localStorage.removeItem('loginData');
      this.router.navigate(['/auth/login']);
    });
  }

  getSavedUser() {
    const savedUser = localStorage.getItem('loginData');

    if (!savedUser) return;

    const user: User = JSON.parse(savedUser);

    // Controlla se il token è scaduto
    if (this.auth.currentUser && !this.auth.currentUser.emailVerified) {
      localStorage.removeItem('loginData'); // Rimuovi l'utente se la sessione è scaduta
      this.authState$.next(null);
    } else {
      this.authState$.next(this.auth.currentUser); // Imposta l'utente come loggato
    }
  }
}
