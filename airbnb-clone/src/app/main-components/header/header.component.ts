import { ApartmentService } from './../../services/apartment.service';
import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private authSvc: AuthService,
    private ApartmentSvc: ApartmentService,
    private router: Router
  ) {}

  showBol: boolean = false;
  isLoggedIn!: boolean;
  logo: string = environment.logo;
  searchQuery!: string;

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  show() {
    this.showBol = !this.showBol;
  }

  logout() {
    this.authSvc.logout();
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
