import { Component, EventEmitter, Output } from '@angular/core';
import { ApartmentService } from '../../services/apartment.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  constructor(private apartmentSvc: ApartmentService) {}

  @Output() category = new EventEmitter<string>();
  @Output() all = new EventEmitter<boolean>();

  categories!: string[];

  ngOnInit() {
    this.apartmentSvc.getCategories().subscribe((res) => {
      this.categories = res;
      console.log(this.categories);
    });
  }

  selectCategory(category: string) {
    this.category.emit(category);
  }

  selectAll(all: boolean) {
    this.all.emit(all);
  }
}
