import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { iApartment } from '../../interfaces/iapartment';
import { ActivatedRoute } from '@angular/router';
import { FavouritesService } from '../../services/favourites.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { iUser } from '../../interfaces/iuser';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss'],
})
export class ApartmentComponent implements OnInit {
  apartment!: iApartment;
  loggedUserId!: string;
  isFavorite: boolean = false;
  host!: iUser;
  rating!: number;
  displayedServices: { service: string; icon: string }[] = [];
  numOfRoom: number = 0;
  array!: any[];

  constructor(
    private apartmentSvc: ApartmentService,
    private route: ActivatedRoute,
    private favSvc: FavouritesService,
    private authSvc: AuthService,
    private userSvc: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.apartmentSvc.getApartmentById(params['id']).subscribe({
        next: (res) => {
          this.apartment = res;
          this.numOfRoom = this.apartment.rooms > 5 ? 2 : 1;
          this.array = Array.from(
            { length: this.numOfRoom },
            (_, index) => index + 1
          );
          this.rating = Math.floor(
            this.apartment.ratings.vote / this.apartment.ratings.count
          );

          // Mappa i servizi con le icone corrispondenti
          this.displayedServices = environment.services.filter((service) =>
            this.apartment.services.includes(service.service)
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
