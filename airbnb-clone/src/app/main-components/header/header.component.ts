import { ApartmentService } from './../../services/apartment.service';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { iUser } from '../../interfaces/iuser';
import { onAuthStateChanged } from 'firebase/auth';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private authSvc: AuthService,
    private ApartmentSvc: ApartmentService,
    private router: Router,
    private messageSvc: MessageService,
    private userSvc: UserService
  ) {}

  showBol: boolean = false;
  isLoggedIn!: boolean;
  logo: string = environment.logo;
  searchQuery!: string;
  unreadMsg!: number;
  user!: iUser;

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.authSvc.authStateOb$.subscribe((authState) => {
        if (authState) {
          this.userSvc.getUserById(authState.uid).subscribe((user) => {
            this.user = user;
          });
        }
      });

      this.messageSvc.unreadMessages$.subscribe((res) => {
        if (res && res.length > 0) {
          this.unreadMsg = res.length;
        }
      });
    });
  }

  show() {
    this.showBol = !this.showBol;
  }

  logout() {
    this.authSvc.logout().subscribe({
      next: () => {
        this.messageSvc.allMessages$.next([]);
        this.messageSvc.unreadMessages$.next([]);
        this.unreadMsg = 0;
      },
    });
  }

  search() {
    if (this.searchQuery) {
      this.ApartmentSvc.getApartmentsBySearch(this.searchQuery).subscribe({
        next: (res) => {
          this.ApartmentSvc.apartments$.next(res);
          this.searchQuery = '';
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.router.navigate(['/']);
        },
      });
    }
  }
}
