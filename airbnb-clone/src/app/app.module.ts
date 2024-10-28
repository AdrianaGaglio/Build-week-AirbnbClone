import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './main-components/header/header.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  ionMenuOutline,
  ionLogoInstagram,
  ionLogoFacebook,
  ionLogoTwitter,
  ionSearchCircleSharp,
} from '@ng-icons/ionicons';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgIconsModule.withIcons({
      ionMenuOutline,
      ionLogoInstagram,
      ionLogoFacebook,
      ionLogoTwitter,

      ionSearchCircleSharp,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
