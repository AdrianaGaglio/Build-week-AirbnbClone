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

@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    PersonalInfoComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgIconsModule.withIcons({
      ionEyeOutline,
      ionDocumentLockOutline,
      ionLockClosedOutline,
    }),
  ],
})
export class ProfileModule {}
