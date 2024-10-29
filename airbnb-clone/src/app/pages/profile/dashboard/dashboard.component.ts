import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ApartmentService } from '../../../services/apartment.service';
import { iApartment } from '../../../interfaces/iapartment';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private apartmentSvc: ApartmentService,
    private authSvc: AuthService
  ) {}

  apartments!: iApartment[];

  ngOnInit() {
    this.authSvc.authState$.subscribe((user) => {
      if (user) {
        this.apartmentSvc.getApartmentsByUser(user.uid).subscribe((res) => {
          this.apartments = res;
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
}
