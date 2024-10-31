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
import { environment } from '../../../environments/environment.development';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private storage: AngularFireStorage
  ) {}
  private modalService = inject(NgbModal);

  registerForm!: FormGroup;
  logo: string = environment.logo;
  message!: string;

  selectedImg: File | null = null;
  imgURL: string | null = null;

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
      this.onUpload();
    }
  }

  sendDataRegister() {
    this.authSvc.register(this.registerForm.value).subscribe({
      next: () => {
        this.registerForm.reset();
        this.message = 'Registrazione avvenuta con successo';
        this.openModal(this.message, true);
        setTimeout(() => {
          this.authSvc.isRegistering = false;
          this.authSvc.logout();
          this.router.navigate(['/auth/login']);
          this.modalService.dismissAll();
        }, 2000);
      },
      error: (err) => {
        this.authSvc.isRegistering = false;
        console.log(err.code);

        if (err.code == 'auth/email-already-in-use') {
          this.message = 'Email esistente';
        } else if (err.code == 'auth/invalid-email') {
          this.message = 'Email non valida';
        } else {
          this.message = 'Errore nella registrazione';
        }

        this.openModal(this.message, false);
      },
    });
  }
  openModal(message: string, value: boolean) {
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isOk = value;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImg = fileInput.files[0];
    }
  }

  onUpload(): void {
    if (this.selectedImg) {
      const filePath = `imagesProfile/${Date.now()}_${this.selectedImg.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedImg);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.imgURL = url;
              console.log('Immagine caricata con successo, URL:', url);

              // Aggiorna il form con l'URL dell'immagine
              this.registerForm.patchValue({
                profileImg: this.imgURL,
              });

              // Invia i dati di registrazione solo dopo aver ottenuto l'URL dell'immagine
              this.sendDataRegister();
            });
          })
        )
        .subscribe();
    }
  }
}
