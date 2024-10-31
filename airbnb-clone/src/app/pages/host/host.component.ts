import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { iUser } from '../../interfaces/iuser';
import { ApartmentService } from '../../services/apartment.service';
import { iApartment } from '../../interfaces/iapartment';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupComponent } from '../../shared/sharedmodal/popup/popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss',
})
export class HostComponent implements OnInit {
  constructor(
    private userSvc: UserService,
    private route: ActivatedRoute,
    private apartmentSvc: ApartmentService,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private modalSvc: NgbModal
  ) {}

  user!: iUser;
  message!: string;
  apartments!: iApartment[];
  ratings!: number;
  loggedIn!: boolean;

  loggedUserId!: string;

  showAll: boolean = false;
  showRatings: boolean = false;
  ratingsForm!: FormGroup;

  ngOnInit(): void {
    this.authSvc.authState$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.loggedIn = true;

        this.loggedUserId = isLoggedIn.uid;
      }
    });
    this.route.params.subscribe((params) => {
      this.userSvc.getUserById(params['id']).subscribe({
        next: (user) => {
          this.user = user;

          if (user.ratings) {
            this.ratings = Math.floor(user.ratings.vote / user.ratings.count);
          }
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
        },
        error: (err) => {
          this.message = err;
        },
      });

      this.userSvc.getReviewByUserId(params['id']).subscribe({
        next: (reviews) => {
          this.user.reviews = reviews;
        },
        error: (error) => {
          this.message = error;
        },
      });

      this.apartmentSvc.getApartments().subscribe({
        next: (apartments) => {
          this.apartments = apartments.filter(
            (apartment) => apartment.hostId === params['id']
          );
        },
        error: (error) => {
          this.message = error;
        },
      });
    });
  }

  sendReview() {
    const userUpdate = this.ratingsForm.value;

    this.user.ratings.count += userUpdate.ratings.count;
    this.user.ratings.vote += userUpdate.ratings.vote;

    this.user.reviews.push(userUpdate.ratingsReview);

    this.userSvc.changeUserInfo(this.user).subscribe({
      next: (user) => {
        this.openModal('Recensione inviata correttamente', false);
        this.ratingsForm.reset();
        this.showRatings = false;
      },
      error: (err) => {
        this.openModal('Si è verificato un problema', false);
      },
    });
  }

  openModal(message: string, value: boolean) {
    const modalRef = this.modalSvc.open(PopupComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isOk = value;
  }
}
