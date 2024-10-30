import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { iUser } from '../../interfaces/iuser';
import { ApartmentService } from '../../services/apartment.service';
import { iApartment } from '../../interfaces/iapartment';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private fb: FormBuilder
  ) {}

  user!: iUser;
  message!: string;
  apartments!: iApartment[];
  ratings!: number;
  loggedIn!: boolean;

  showRatings: boolean = false;
  ratingsForm!: FormGroup;

  ngOnInit(): void {
    this.authSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });
    this.route.params.subscribe((params) => {
      this.userSvc.getUserById(params['id']).subscribe({
        next: (user) => {
          this.user = user;
          if (user.ratings) {
            this.ratings = Math.floor(user.ratings.vote / user.ratings.count);
          }
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
          console.log(this.apartments);
        },
        error: (error) => {
          this.message = error;
        },
      });
    });

    this.ratingsForm = this.fb.group({
      ratingsStars: this.fb.group({
        star: this.fb.control(''),
        id: this.fb.control(''),
      }),
      ratingsReview: this.fb.group({
        review: this.fb.control(''),
        id: this.fb.control(''),
      }),
    });

    console.log(this.ratingsForm.value);
  }
}
