import { ApartmentComponent } from './../../../apartment/apartment.component';
import { Component, Input } from '@angular/core';
import { iMessage } from '../../../../interfaces/imessage';
import { UserService } from '../../../../services/user.service';
import { iUser } from '../../../../interfaces/iuser';
import { MessageService } from '../../../../services/message.service';
import { ApartmentService } from '../../../../services/apartment.service';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.scss',
})
export class MessageCardComponent {
  @Input() message!: iMessage;
  user!: iUser;
  feedback!: string;

  constructor(
    private userSvc: UserService,
    private messageSvc: MessageService,
    private apartmentSvc: ApartmentService
  ) {}

  ngOnInit() {
    this.userSvc.getUserById(this.message.senderId).subscribe({
      next: (user: iUser) => {
        this.user = user;
      },
      error: (err) => {
        this.feedback = err;
      },
    });
  }

  readMessage() {
    this.message.isRead = true;
    let unreadMessages = this.messageSvc.unreadMessages$.getValue();
    unreadMessages = unreadMessages.filter((msg) => msg.id !== this.message.id);
    this.messageSvc.unreadMessages$.next(unreadMessages);
    this.messageSvc.readMessage(this.message).subscribe();
  }

  changeAvailability() {
    if (this.message.apartment) {
      this.message.apartment.availability = false;
      this.apartmentSvc.changeAvailability(this.message.apartment).subscribe();
    }
  }
}
