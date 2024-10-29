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
      name: this.fb.control(''),
      description: this.fb.control('', [Validators.required]),
      rooms: this.fb.control(''),
      services: this.fb.control(''),
      coverImage: this.fb.control(''),
      otherImages: this.fb.control(''),
      category: this.fb.control(''),
      squaremeters: this.fb.control(''),
      location: this.fb.control(''),
      price: this.fb.control(''),
      // vuote?!
      hostId: this.fb.control(''),
      availability: this.fb.control(true),
      reviews: this.fb.control([]),
    });
  }

  onSubmit() {
    console.log(this.form);
  }
}
