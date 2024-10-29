import { ApartmentComponent } from './pages/apartment/apartment.component';
import { Component } from '@angular/core';
import { ApartmentService } from './services/apartment.service';
import { FavouritesService } from './services/favourites.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private apartmentSvc: ApartmentService,
    private favSvc: FavouritesService,
    private authSvc: AuthService
  ) {}
  isLoggedIn: boolean = false;

  // ngOnInit() {
  //   this.apartmentSvc.getApartments().subscribe((res) => {
  //     this.apartmentSvc.apartments$.next(res);
  //   });
  //   this.authSvc.isLoggedIn$.subscribe((value) => {
  //     this.isLoggedIn = value;
  //   });
  // }
}
