import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { iUser } from '../../interfaces/iuser';
import { ApartmentService } from '../../services/apartment.service';
import { iApartment } from '../../interfaces/iapartment';
import { AuthService } from '../../auth/auth.service';

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
    private authSvc: AuthService
  ) {}

  user!: iUser;
  message!: string;
  apartments!: iApartment[];
  ratings!: number;
  loggedIn!: boolean;

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
  }
}
