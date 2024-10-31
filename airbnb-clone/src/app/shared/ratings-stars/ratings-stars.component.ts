import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ratings-stars',
  templateUrl: './ratings-stars.component.html',
  styleUrl: './ratings-stars.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingsStarsComponent),
      multi: true,
    },
  ],
})
export class RatingsStarsComponent implements ControlValueAccessor {
  value: number = 0;

  onChange = (value: number) => {};
  onTouched = () => {};

  // Metodo chiamato quando si seleziona un radio button
  selectRating(value: number) {
    this.value = value;
    this.onChange(value);
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
