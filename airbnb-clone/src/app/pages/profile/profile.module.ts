import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  ionEyeOutline,
  ionDocumentLockOutline,
  ionLockClosedOutline,
} from '@ng-icons/ionicons';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewApartmentComponent } from './add-new-apartment/add-new-apartment.component';
import { SharedmodalModule } from '../../shared/sharedmodal/sharedmodal.module';
import { FavouritesComponent } from './favourites/favourites.component';
import { EditAparmentComponent } from './edit-aparment/edit-aparment.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageCardComponent } from './components/message-card/message-card.component';

@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    PersonalInfoComponent,
    SidebarComponent,
    AddNewApartmentComponent,
    FavouritesComponent,
    EditAparmentComponent,
    MessagesComponent,
    MessageCardComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    SharedmodalModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      ionEyeOutline,
      ionDocumentLockOutline,
      ionLockClosedOutline,
    }),
    FormsModule,
  ],
})
export class ProfileModule {}
