import { Component, EventEmitter, Output } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  constructor(private apartmentSvc: ApartmentService) {}

  @Output() category = new EventEmitter<string>();
  @Output() all = new EventEmitter<boolean>();

  categories = environment.categories;

  ngOnInit() {
    this.apartmentSvc.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  selectCategory(category: string) {
    this.category.emit(category);
  }

  selectAll(all: boolean) {
    this.all.emit(all);
  }
}
