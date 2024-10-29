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
  rating!: number;
  user!: iUser;

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const uid = this.authSvc.authState$.value?.uid; // Ottieni l'uid dell'utente loggato
        if (uid) {
          this.userSvc.getUserById(uid).subscribe((user) => {
            this.user = user; // Assegna i dati dell'utente alla proprietà `user`
            this.favSvc
              .checkIfPresent(this.user.id, this.apartment)
              .subscribe((isPresent) => {
                this.isFavorite = isPresent;
              });
          });
        }
      }
    });

    this.rating = Math.floor(
      this.apartment.ratings.vote / this.apartment.ratings.count
    );
    if (this.rating > 3) {
      this.isAppreciated = true;
    }
  }

  addToFavourite() {
    this.favSvc.addToFavourite(this.user.id, this.apartment).subscribe();
  }

  removeFromFavourite() {}

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
