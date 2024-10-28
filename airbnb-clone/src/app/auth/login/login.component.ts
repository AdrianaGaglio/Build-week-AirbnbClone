import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private authSvc: AuthService) {}

  loginForm!: FormGroup;
  message!: string;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  isInvalidTouched(fieldName: string) {
    return (
      this.loginForm.get(fieldName)?.invalid &&
      this.loginForm.get(fieldName)?.touched
    );
  }

  getError(fieldName: string) {
    if (this.loginForm.get(fieldName)?.errors!['required']) {
      return 'Campo obbligatorio';
    } else if (this.loginForm.get(fieldName)?.errors!['email']) {
      return 'Email non valida';
    }
    return null;
  }

  login() {
    if (this.loginForm.valid) {
      this.authSvc.login(this.loginForm.value).subscribe({
        next: () => {
          this.loginForm.reset();
          this.message = 'Login avvenuto con successo';
        },
        error: (err) => {
          this.message = err;
        },
      });
    }
  }
}
