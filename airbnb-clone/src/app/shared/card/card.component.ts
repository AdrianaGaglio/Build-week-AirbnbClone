import { Component, Input, OnInit } from '@angular/core';
import { iApartment } from '../../interfaces/iapartment';
import { FavouritesService } from '../../services/favourites.service';
import { iUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  constructor(
    private favSvc: FavouritesService,
    private authSvc: AuthService,
    private userSvc: UserService
  ) {}

  @Input() apartment!: iApartment;
  isAppreciated!: boolean;
  isFavorite = false;
  favourites!: iApartment[];
  rating!: number;
  user!: iUser;

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const uid = this.authSvc.authState$.value?.uid; // Ottieni l'uid dell'utente loggato
        if (uid) {
          this.userSvc.getUserById(uid).subscribe((user) => {
            this.user = user; // Assegna i dati dell'utente alla proprietà `user`
          });
        }
      }
    });
    if (this.apartment.ratings) {
      this.rating = Math.floor(
        this.apartment.ratings.vote / this.apartment.ratings.count
      );
      if (this.rating > 3) {
        this.isAppreciated = true;
      }
    }
    this.favSvc.userFavourites$.subscribe((favourites) => {
      this.favourites = favourites;
      let found = this.favourites.find(
        (favourite) => favourite.id === this.apartment.id
      );
      if (found) this.isFavorite = true;
    });
  }

  addToFavourite() {
    this.favSvc.addToFavourite(this.user.id, this.apartment).subscribe();
  }

  removeFromFavourite() {}

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
