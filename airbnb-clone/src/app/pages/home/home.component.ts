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
    this.apartmentSvc.apartments$.subscribe((res) => {
      if (typeof res !== 'string') {
        this.apartments = res;
      } else {
        this.message = res;
      }
    });
  }

  filterByCategory(category: string) {
    this.apartmentSvc.getApartmentsByCategory(category).subscribe({
      next: (res) => {
        this.apartmentSvc.apartments$.next(res);
      },
      error: (err) => {
        this.message = err;
      },
    });
  }

  allCategories(all: boolean) {
    this.apartmentSvc.getApartments().subscribe((res) => {
      this.apartmentSvc.apartments$.next(res);
    });
  }
}
