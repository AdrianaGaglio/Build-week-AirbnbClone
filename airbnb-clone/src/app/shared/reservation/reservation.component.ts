import { Component, Input } from '@angular/core';
import { iApartment } from '../../interfaces/iapartment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent {
  constructor(private fb: FormBuilder, private authSvc: AuthService) {}

  @Input() apartment!: iApartment;

  isApartment!: boolean;
  commentForm!: FormGroup;
  senderId!: string;

  ngOnInit() {
    if (this.apartment) {
      this.isApartment = true;
    }

    this.authSvc.authState$.subscribe((user) => {
      if (user) {
        this.senderId = user.uid;
        this.commentForm = this.fb.group({
          senderId: this.fb.control(this.senderId),
          receiverId: this.fb.control(
            this.apartment.hostId ? this.apartment.hostId : null
          ),
          message: this.fb.control('', Validators.required),
          apartment: this.fb.control(this.apartment ? this.apartment : null),
          isRead: this.fb.control(false),
        });
      }
    });
  }

  sendMessage() {
    console.log(this.commentForm.value);
  }
}
