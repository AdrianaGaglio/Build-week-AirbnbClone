import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ApartmentService } from '../../../services/apartment.service';
import { iApartment } from '../../../interfaces/iapartment';
import { AuthService } from '../../../auth/auth.service';
import { iUser } from '../../../interfaces/iuser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private apartmentSvc: ApartmentService,
    private authSvc: AuthService,
    private userSvc: UserService
  ) {}

  apartments!: iApartment[];
  user!: iUser;

  ngOnInit() {
    this.authSvc.authState$.subscribe((user) => {
      if (user) {
        this.apartmentSvc.getApartmentsByUser(user.uid).subscribe((res) => {
          this.apartments = res;
          this.userSvc.getUserById(user.uid).subscribe((userInfo) => {
            this.user = userInfo;
          });
        });
      }
    });
  }

  addNewApartment() {
    this.router.navigate(['/profile/new-apartment']);
  }

  editApartment(id: number) {
    this.router.navigate([`/profile/edit-apartment/${id}`]);
  }

  deleteApartment(id: number) {
    this.apartmentSvc.deleteApartmentById(id).subscribe();
    this.apartments = this.apartments.filter((data) => data.id !== id);
  }

  checkOut(apartment: iApartment) {
    apartment.availability = true;
    this.apartmentSvc.changeAvailability(apartment).subscribe();
  }
}
