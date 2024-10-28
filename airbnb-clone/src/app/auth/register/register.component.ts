import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      profileImg: this.fb.control(''),
      role: this.fb.control('', [Validators.required]),
    });
  }

  isInvalidTouched(fieldName: string) {
    return (
      this.registerForm.get(fieldName)?.invalid &&
      this.registerForm.get(fieldName)?.touched
    );
  }

  register() {
    console.log(this.registerForm.valid);
  }
}
