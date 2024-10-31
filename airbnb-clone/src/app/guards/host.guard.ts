import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';
import { iUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class HostGuard implements CanActivate, CanActivateChild {
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private usersSvc: UserService
  ) {}
  user!: iUser;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.authSvc.authStateOb$.pipe(
      map((data) => {
        if (data) {
          let user: iUser | null = null;
          this.usersSvc.getUserById(data.uid).subscribe((userFromId) => {
            if (!userFromId) {
              this.router.navigate(['/login']);
              return false;
            } else {
              user = userFromId;

              if (user?.role !== 'host') {
                this.router.navigate(['/profile/personal-info']);
                return false;
              }
              return true;
            }
          });
        }

        // if (!data) {
        //   this.router.navigate(['/login']);
        //   return false;
        // }
        // console.log(data);

        // if (data) {
        // if (data. !== 'host') {
        //   this.router.navigate(['/profile']);
        //   return false;
        // }
        // }

        return true;
      })
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.canActivate(childRoute, state);
  }
}
