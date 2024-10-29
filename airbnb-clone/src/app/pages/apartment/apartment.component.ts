import { Component } from '@angular/core';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.scss'],
})
export class ApartmentComponent {
  isFavorite: boolean = false;

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }
}
