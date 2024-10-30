import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iMessage } from '../interfaces/imessage';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  messageUrl = environment.messageUrl;

  unreadMessages$ = new BehaviorSubject<iMessage[] | []>([]);
  allMessages$ = new BehaviorSubject<iMessage[] | []>([]);

  getMessages(userId: string): Observable<iMessage[]> {
    return this.http
      .get<iMessage[]>(this.messageUrl)
      .pipe(
        map((messages: iMessage[]) =>
          messages.filter((message: iMessage) => message.receiverId === userId)
        )
      )
      .pipe(
        catchError((error) => {
          return throwError(() => {
            let message = '';
            if (error.status >= 400 && error.status < 500) {
              message = 'Nessun messaggio';
            } else if (error.status === 500) {
              message = 'Errore nella richiesta';
            }
            return message;
          });
        })
      );
  }

  sendMessage(message: Partial<iMessage>): Observable<iMessage> {
    return this.http.post<iMessage>(this.messageUrl, message).pipe(
      catchError((error) => {
        return throwError(() => {
          let message = '';
          if (error.status >= 400 && error.status < 500) {
            message = 'Nessun messaggio';
          } else if (error.status === 500) {
            message = 'Errore nella richiesta';
          }
          return message;
        });
      })
    );
  }

  readMessage(message: iMessage) {
    return this.http
      .put<iMessage>(`${this.messageUrl}/${message.id}`, message)
      .pipe(
        catchError((error) => {
          return throwError(() => {
            let message = '';
            if (error.status >= 400 && error.status < 500) {
              message = 'Nessun messaggio';
            } else if (error.status === 500) {
              message = 'Errore nella richiesta';
            }
            return message;
          });
        })
      );
  }
}
