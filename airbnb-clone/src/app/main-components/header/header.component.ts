import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authSvc: AuthService) {}

  showBol: boolean = false;
  isLoggedIn!: boolean;
  logo: string = environment.logo;

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
}
