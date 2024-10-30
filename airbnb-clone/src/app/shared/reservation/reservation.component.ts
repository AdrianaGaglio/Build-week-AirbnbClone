import { Component, Input } from '@angular/core';
import { iApartment } from '../../interfaces/iapartment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss',
})
export class ReservationComponent {
  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private route: ActivatedRoute,
    private messageSvc: MessageService
  ) {}

  @Input() apartment!: iApartment;

  isApartment!: boolean;
  commentForm!: FormGroup;
  senderId!: string;
  receiverId!: string;
  message!: string;

  ngOnInit() {
    if (this.apartment) {
      this.isApartment = true;
      this.receiverId = this.apartment.hostId;
    } else {
      this.route.params.subscribe((params) => {
        this.receiverId = params['id'];
      });
    }
    this.authSvc.authState$.subscribe((user) => {
      if (user && this.receiverId) {
        this.senderId = user.uid;
        this.commentForm = this.fb.group({
          senderId: this.fb.control(this.senderId),
          receiverId: this.fb.control(this.receiverId),
          message: this.fb.control('', Validators.required),
          apartment: this.fb.control(this.apartment ? this.apartment : ''),
          isRead: this.fb.control(false),
          date: this.fb.control(Date.now()),
        });
      }
    });
  }

  sendMessage() {
    if (this.commentForm.valid) {
      this.messageSvc.sendMessage(this.commentForm.value).subscribe({
        next: (message) => {
          this.message = 'Messaggio inviato correttamente';
        },
        error: (err) => {
          this.message = err;
        },
      });
    }
  }
}
