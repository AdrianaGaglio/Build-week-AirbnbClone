import { Component } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { iApartment } from '../../interfaces/iapartment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  apartaments: iApartment[] = [];
  constructor(private apartmentSvc: ApartmentService) {
    this.apartmentSvc.getApartments().subscribe((res) => {
      this.apartaments = res;
    });
  }
}
