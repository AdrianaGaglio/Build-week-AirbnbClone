import { Component, Input } from '@angular/core';
import { iApartment } from '../../interfaces/iapartment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { PopupComponent } from '../sharedmodal/popup/popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private messageSvc: MessageService,
    private modalSvc: NgbModal
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
          this.commentForm.reset();
          this.openModal(this.message, false);
        },
        error: (err) => {
          this.message = err;
        },
      });
    }
  }

  openModal(message: string, value: boolean) {
    const modalRef = this.modalSvc.open(PopupComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isOk = value;
  }
}
