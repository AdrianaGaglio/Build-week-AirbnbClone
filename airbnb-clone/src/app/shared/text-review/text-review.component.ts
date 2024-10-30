import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-text-review',
  templateUrl: './text-review.component.html',
  styleUrl: './text-review.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextReviewComponent),
      multi: true,
    },
  ],
})
export class TextReviewComponent implements ControlValueAccessor {
  control = new FormControl();

  onChange = (value: string) => {};
  onTouched = () => {};

  onInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: string): void {
    // this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
