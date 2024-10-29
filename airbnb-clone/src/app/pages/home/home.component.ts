import { Component } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { iApartment } from '../../interfaces/iapartment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  apartments: iApartment[] = [];
  message!: string;
  constructor(private apartmentSvc: ApartmentService) {}

  ngOnInit() {
    this.apartmentSvc.getApartments().subscribe((res) => {
      this.apartments = res;
    });
  }

  filterByCategory(category: string) {
    this.apartmentSvc.getApartmentsByCategory(category).subscribe({
      next: (apartments) => {
        this.apartments = apartments;
      },
      error: (err) => {
        this.message = err;
      },
    });
  }

  allCategories(all: boolean) {
    this.apartmentSvc.getApartments().subscribe((res) => {
      this.apartments = res;
    });
  }
}
