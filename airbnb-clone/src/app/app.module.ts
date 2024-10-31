import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { importProvidersFrom } from '@angular/core';

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
  ionChatboxOutline,
  ionFlameOutline,
  ionTvOutline,
  ionWifiOutline,
  ionSnowOutline,
  ionShirtOutline,
  ionCafeOutline,
  ionHandLeftOutline,
  ionCarOutline,
  ionWaterOutline,
  ionFootballOutline,
  ionBonfireOutline,
  ionRoseOutline,
  ionBodyOutline,
  ionPersonOutline,
} from '@ng-icons/ionicons';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { matLocalLaundryService } from '@ng-icons/material-icons/baseline';
import { matKitchen } from '@ng-icons/material-icons/baseline';
import { matMicrowave } from '@ng-icons/material-icons/baseline';
import { matBalcony } from '@ng-icons/material-icons/baseline';
import { matPets } from '@ng-icons/material-icons/baseline';
import { matWaves } from '@ng-icons/material-icons/baseline';
import { matCleaningServices } from '@ng-icons/material-icons/baseline';
import { matHelpCenter } from '@ng-icons/material-icons/baseline';
import { matLandscape } from '@ng-icons/material-icons/baseline';
import { matRoomService } from '@ng-icons/material-icons/baseline';
import { matLocalBar } from '@ng-icons/material-icons/baseline';
import { matBakeryDining } from '@ng-icons/material-icons/baseline';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment.development';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';

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
      ionChatboxOutline,
      ionFlameOutline,
      ionTvOutline,
      ionWifiOutline,
      ionSnowOutline,
      ionShirtOutline,
      matKitchen,
      matMicrowave,
      ionCafeOutline,
      ionHandLeftOutline,
      ionCarOutline,
      ionWaterOutline,
      ionFootballOutline,
      ionBonfireOutline,
      matBalcony,
      ionRoseOutline,
      ionBodyOutline,
      matPets,
      matWaves,
      matCleaningServices,
      matHelpCenter,
      matLocalLaundryService,
      matLandscape,
      matRoomService,
      matLocalBar,
      matBakeryDining,
      ionPersonOutline,
    }),
    FormsModule,
    SharedModule,
    BrowserModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
