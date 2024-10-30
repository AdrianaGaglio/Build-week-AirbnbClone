import { ApartmentComponent } from './pages/apartment/apartment.component';
import { Component } from '@angular/core';
import { ApartmentService } from './services/apartment.service';
import { FavouritesService } from './services/favourites.service';
import { AuthService } from './auth/auth.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private apartmentSvc: ApartmentService,
    private favSvc: FavouritesService,
    private authSvc: AuthService,
    private messageSvc: MessageService
  ) {}
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.apartmentSvc.getApartments().subscribe((res) => {
      this.apartmentSvc.apartments$.next(res);
    });
    this.authSvc.isLoggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
    this.authSvc.authState$.subscribe((user) => {
      if (user) {
        this.messageSvc.getMessages(user.uid).subscribe((msgs) => {
          if (msgs) {
            console.log(msgs);
            this.messageSvc.allMessages$.next(msgs);
            let unread = msgs.filter((msg) => msg.isRead);
            this.messageSvc.unreadMessages$.next(unread);
          }
        });
      }
    });
  }
}
