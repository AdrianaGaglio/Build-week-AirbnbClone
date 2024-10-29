import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../shared/sharedmodal/popup/popup.component';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}
  private modalService = inject(NgbModal);

  loginForm!: FormGroup;
  logo: string = environment.logo;
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
          this.openModal(this.message, true);
          setTimeout(() => {
            this.router.navigate(['/']);
            this.modalService.dismissAll();
          }, 2000);
        },
        error: (err) => {
          this.message = err.message;

          this.openModal(this.message, false);
        },
      });
    }
  }
  openModal(message: string, value: boolean) {
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isOk = value;
  }
}
