import { ApartmentComponent } from './../../../apartment/apartment.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() messageDeleted = new EventEmitter<number>();
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
    console.log(this.message);
  }

  readMessage() {
    this.message.isRead = true;
    let unreadMessages = this.messageSvc.unreadMessages$.getValue();
    unreadMessages = unreadMessages.filter((msg) => msg.id !== this.message.id);
    this.messageSvc.unreadMessages$.next(unreadMessages);
    this.messageSvc.changeMessageStatus(this.message).subscribe();
  }

  changeAvailability() {
    this.message.isRead = true;
    if (this.message.apartment) {
      this.message.apartment.availability = false;
      this.messageSvc.changeMessageStatus(this.message).subscribe();
      this.apartmentSvc.changeAvailability(this.message.apartment).subscribe();
      let newMessage = {
        apartment: this.message.apartment,
        date: new Date(Date.now()),
        isRead: false,
        message: 'Prenotazione confermata!',
        senderId: this.message.receiverId,
        receiverId: this.message.senderId,
      };
      this.messageSvc.sendMessage(newMessage).subscribe();
    }
  }

  deleteMsg() {
    this.messageSvc.delete(this.message).subscribe();
    this.messageDeleted.emit(this.message.id);
  }
}
