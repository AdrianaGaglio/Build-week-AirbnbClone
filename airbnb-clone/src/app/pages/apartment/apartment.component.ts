import { Component } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { iApartment } from '../../interfaces/iapartment';
import { ActivatedRoute } from '@angular/router';
import { FavouritesService } from '../../services/favourites.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { iUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss'],
})
export class ApartmentComponent {
  constructor(
    private apartmentSvc: ApartmentService,
    private route: ActivatedRoute,
    private favSvc: FavouritesService,
    private authSvc: AuthService,
    private userSvc: UserService
  ) {}

  apartment!: iApartment;
  loggedUserId!: string;
  isFavorite: boolean = false;
  host!: iUser;
  rating!: number;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.apartmentSvc.getApartmentById(params['id']).subscribe({
        next: (res) => {
          this.apartment = res;
          this.rating = Math.floor(
            this.apartment.ratings.vote / this.apartment.ratings.count
          );
          this.userSvc.getUserById(this.apartment.hostId).subscribe((user) => {
            this.host = user;
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    });

    this.authSvc.authState$.subscribe((user) => {
      if (user) this.loggedUserId = user.uid;
    });
  }

  addRemoveFavourite(): void {
    this.favSvc.addRemoveFavourite(this.loggedUserId, this.apartment);
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
