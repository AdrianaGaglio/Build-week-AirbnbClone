import { Component } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  constructor(private apartmentSvc: ApartmentService) {}

  categories!: string[];

  ngOnInit() {
    this.apartmentSvc.getCategories().subscribe((res) => {
      this.categories = res;
      console.log(this.categories);
    });
  }
}
