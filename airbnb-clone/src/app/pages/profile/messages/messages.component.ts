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
  showAll: boolean = false;

  ngOnInit() {
    this.messageSvc.allMessages$.subscribe((msgs) => {
      this.messages = msgs.sort((a: iMessage, b: iMessage) => {
        // Ordina prima per 'isRead' (dove i non letti - false - vengono per primi)
        const isReadOrder = Number(a.isRead) - Number(b.isRead);

        // Se 'isReadOrder' è diverso da 0, mantieni questo ordinamento
        if (isReadOrder !== 0) return isReadOrder;

        // In caso di parità, ordina per data (dalla più recente alla più vecchia)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
  }

  showHide() {
    this.showAll = !this.showAll;
  }
}
