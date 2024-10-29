import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-apartment',
  templateUrl: './add-new-apartment.component.html',
  styleUrl: './add-new-apartment.component.scss',
})
export class AddNewApartmentComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      description: this.fb.control('', [Validators.required]),
      rooms: this.fb.control('', [Validators.required]),
      services: this.fb.control('', [Validators.required]),
      coverImage: this.fb.control('', [Validators.required]),
      otherImages: this.fb.control('', [Validators.required]),
      category: this.fb.control('', [Validators.required]),
      squaremeters: this.fb.control('', [Validators.required]),
      location: this.fb.control('', [Validators.required]),
      price: this.fb.control('', [Validators.required]),
      // vuote?!
      hostId: this.fb.control(''),
      availability: this.fb.control(true),
      reviews: this.fb.control([]),
    });
  }

  onSubmit() {
    console.log(this.form.valid);
  }
}
