import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iAuthData } from '../interfaces/iauthdata';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { iUser } from '../interfaces/iuser';
import { iLoginData } from '../interfaces/ilogindata';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwt: JwtHelperService = new JwtHelperService();

  registerUrl: string = environment.registerUrl;
  loginUrl: string = environment.loginUrl;

  authResponse$ = new BehaviorSubject<iAuthData | null>(null);

  user$ = this.authResponse$
    .asObservable()
    .pipe(map((data) => (data ? data.user : null)));

  isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  constructor(private http: HttpClient, private router: Router) {
    this.getSavedUser();
  }

  register(user: Partial<iUser>) {
    return this.http.post<iAuthData>(this.registerUrl, user);
  }
  login(user: iLoginData) {
    return this.http.post<iAuthData>(this.loginUrl, user).pipe(
      tap((authData) => {
        console.log(authData);

        this.authResponse$.next(authData);

        localStorage.setItem('loginData', JSON.stringify(authData));

        const expData = this.jwt.getTokenExpirationDate(authData.accessToken);

        if (expData) {
          this.autoLogout(expData);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('loginData');
    this.authResponse$.next(null);
    this.router.navigate(['/login']);
  }

  autoLogout(expData: Date) {
    const expTime = expData.getTime() - new Date().getTime();

    setTimeout(() => {
      this.logout();
    }, expTime);
  }

  getSavedUser() {
    const savedUser = localStorage.getItem('loginData');

    if (!savedUser) return;
    const loginResponse: iAuthData = JSON.parse(savedUser);

    if (this.jwt.isTokenExpired(loginResponse.accessToken)) {
      localStorage.removeItem('loginData');
      return;
    }
    this.authResponse$.next(loginResponse);
  }
}
