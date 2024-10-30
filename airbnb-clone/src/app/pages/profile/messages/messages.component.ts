import { Component } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { iMessage } from '../../../interfaces/imessage';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent {
  constructor(private messageSvc: MessageService) {}

  messages!: iMessage[];

  ngOnInit() {
    this.messageSvc.allMessages$.subscribe((msgs) => {
      this.messages = msgs.sort(
        (a: iMessage, b: iMessage) => Number(a.isRead) - Number(b.isRead)
      );
    });
  }
}
