import { Component } from '@angular/core';
import { iApartment } from '../../../interfaces/iapartment';
import { FavouritesService } from '../../../services/favourites.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss',
})
export class FavouritesComponent {
  apartments!: iApartment[];
  message!: string;

  constructor(
    private favSvc: FavouritesService,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.favSvc.userFavourites$.subscribe((res) => (this.apartments = res));
  }
}
