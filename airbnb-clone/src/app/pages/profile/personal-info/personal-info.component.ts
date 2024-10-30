import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { iUser } from '../../../interfaces/iuser';
import { UserService } from '../../../services/user.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent implements OnInit {
  constructor(
    private authSvc: AuthService,
    private userSvc: UserService,
    private storage: AngularFireStorage
  ) {}

  user!: iUser;
  toggleName: boolean = false;
  toggleUsername: boolean = false;
  toggleEmail: boolean = false;
  togglePhone: boolean = false;
  toggleImg: boolean = false;

  selectedImg: File | null = null;
  imgURL: string | null = null;

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe((logged) => {
      if (logged) {
        const uid = this.authSvc.authState$.value?.uid; // Ottieni l'uid dell'utente loggato
        if (uid) {
          this.userSvc.getUserById(uid).subscribe((user) => {
            this.user = user; // Assegna i dati dell'utente alla proprietà `user`
          });
        }
      }
    });
  }

  changeName() {
    this.toggleName = !this.toggleName;
  }

  changeAddImg() {
    this.toggleImg = !this.toggleImg;
    this.selectedImg = null;
  }

  updateName() {
    this.userSvc.changeUserInfo(this.user).subscribe();
    this.toggleName = false;
  }

  changeUsername() {
    this.toggleUsername = !this.toggleUsername;
  }

  updateUsername() {
    this.userSvc.changeUserInfo(this.user).subscribe();
    this.toggleUsername = false;
  }

  changeEmail() {
    this.toggleEmail = !this.toggleEmail;
  }

  updateEmail() {
    this.userSvc.changeUserInfo(this.user).subscribe();
    this.toggleEmail = false;
  }

  changePhone() {
    this.togglePhone = !this.togglePhone;
  }

  updatePhone() {
    this.userSvc.changeUserInfo(this.user).subscribe();
    this.togglePhone = false;
  }

  onUpload(): void {
    if (this.selectedImg) {
      if (this.user.profileImg) {
        const oldFileRef = this.storage.refFromURL(this.user.profileImg);
        oldFileRef.delete().subscribe({
          next: () => (this.toggleImg = false),
          error: (err) =>
            console.error(
              'Errore durante l’eliminazione dell’immagine vecchia:',
              err
            ),
        });
      }

      // Carica la nuova immagine
      const filePath = `imagesProfile/${Date.now()}_${this.selectedImg.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedImg);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.imgURL = url;
              console.log('Nuova immagine caricata con successo, URL:', url);

              if (this.imgURL) {
                this.user.profileImg = this.imgURL;
                this.toggleImg = false;
              }

              // Invia i dati aggiornati dell'utente
              this.updateUserProfile();
            });
          })
        )
        .subscribe();
    }
  }

  updateUserProfile() {
    this.userSvc.changeUserInfo(this.user).subscribe({});
  }
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImg = fileInput.files[0];
    }
  }
}
