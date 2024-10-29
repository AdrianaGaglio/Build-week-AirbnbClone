import { ApartmentComponent } from './pages/apartment/apartment.component';
import { Component } from '@angular/core';
import { ApartmentService } from './services/apartment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private apartmentSvc: ApartmentService) {}

  ngOnInit() {
    this.apartmentSvc.getApartments().subscribe((res) => {
      this.apartmentSvc.apartments$.next(res);
    });
  }
}
