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
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SharedModule } from './shared/shared.module';

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
    SharedModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
