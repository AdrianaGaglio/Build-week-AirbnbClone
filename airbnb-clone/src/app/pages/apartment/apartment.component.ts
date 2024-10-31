import { Component, OnInit } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { iApartment } from '../../interfaces/iapartment';
import { ActivatedRoute } from '@angular/router';
import { FavouritesService } from '../../services/favourites.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { iUser } from '../../interfaces/iuser';
import { environment } from '../../../environments/environment.development';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../shared/sharedmodal/popup/popup.component';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss'],
})
export class ApartmentComponent implements OnInit {
  constructor(
    private apartmentSvc: ApartmentService,
    private route: ActivatedRoute,
    private favSvc: FavouritesService,
    private authSvc: AuthService,
    private userSvc: UserService,
    private fb: FormBuilder,
    private modalSvc: NgbModal
  ) {}

  apartment!: iApartment;
  loggedUserId!: string;
  isFavorite: boolean = false;
  host!: iUser;
  rating!: number;
  displayedServices: { service: string; icon: string }[] = [];
  numOfRoom: number = 0;
  array!: any[];

  showRatings: boolean = false;
  ratingsForm!: FormGroup;
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

      this.ratingsForm = this.fb.group({
        ratings: this.fb.group({
          vote: this.fb.control(0, [Validators.required]),
          count: this.fb.control(1),
        }),
        ratingsReview: this.fb.group({
          comment: this.fb.control(''),
          userId: this.fb.control(this.loggedUserId),
          date: this.fb.control(Date.now()),
        }),
      });
    });
  }

  addRemoveFavourite(): void {
    this.favSvc.addRemoveFavourite(this.loggedUserId, this.apartment);
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  sendReview() {
    const apartmentUpdate = this.ratingsForm.value;

    this.apartment.ratings.count += apartmentUpdate.ratings.count;
    this.apartment.ratings.vote += apartmentUpdate.ratings.vote;

    this.apartment.reviews.push(apartmentUpdate.ratingsReview);

    this.apartmentSvc.changeAvailability(this.apartment).subscribe();

    this.openModal('Feedback inviato con successo', true);
  }

  openModal(message: string, value: boolean) {
    const modalRef = this.modalSvc.open(PopupComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isOk = value;
  }
}
