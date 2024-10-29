import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentComponent } from './apartment.component';

import { NgIconsModule } from '@ng-icons/core';
import { ionHeart, ionHeartOutline } from '@ng-icons/ionicons';
import { SharedResModule } from '../../shared/reservation/sharedRes.module';

@NgModule({
  declarations: [ApartmentComponent],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    NgIconsModule.withIcons({ ionHeart, ionHeartOutline }),
    SharedResModule,
  ],
})
export class ApartmentModule {}
