import { ApartmentService } from './../../services/apartment.service';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

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
    private messageSvc: MessageService
  ) {}

  showBol: boolean = false;
  isLoggedIn!: boolean;
  logo: string = environment.logo;
  searchQuery!: string;
  unreadMsg!: number;

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.messageSvc.unreadMessages$.subscribe((res) => {
      if (res && res.length > 0) {
        this.unreadMsg = res.length;
      }
    });
  }

  show() {
    this.showBol = !this.showBol;
  }

  logout() {
    this.authSvc.logout().subscribe();
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
