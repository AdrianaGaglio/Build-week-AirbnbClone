import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { iUser } from '../../../interfaces/iuser';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent implements OnInit {
  constructor(private authSvc: AuthService, private userSvc: UserService) {}

  user!: iUser;
  toggleName: boolean = false;
  toggleUsername: boolean = false;
  toggleEmail: boolean = false;
  togglePhone: boolean = false;

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
}
