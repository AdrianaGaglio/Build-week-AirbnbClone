import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PopupComponent } from '../../shared/sharedmodal/popup/popup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}
  private modalService = inject(NgbModal);

  registerForm!: FormGroup;
  message!: string;

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
      num_of_apartments: this.fb.control(0),
      ratings: this.fb.control({ vote: 0, count: 0 }),
      reviews: this.fb.control([]),
    });
  }

  isInvalidTouched(fieldName: string) {
    return (
      this.registerForm.get(fieldName)?.invalid &&
      this.registerForm.get(fieldName)?.touched
    );
  }

  getError(fieldName: string) {
    if (this.registerForm.get(fieldName)?.errors!['required']) {
      return 'Campo obbligatorio';
    } else if (this.registerForm.get(fieldName)?.errors!['email']) {
      return 'Email non valida';
    } else if (this.registerForm.get(fieldName)?.hasError('minlength')) {
      return 'La password deve avere almeno 8 caratteri';
    }
    return null;
  }

  register() {
    if (this.registerForm.valid) {
      this.authSvc.register(this.registerForm.value).subscribe({
        next: () => {
          this.registerForm.reset();
          this.message = 'Registrazione avvenuta con successo';
          this.openModal(this.message, true);
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
            this.modalService.dismissAll();
          }, 2000);
        },
        error: (err) => {
          this.message = err;
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
