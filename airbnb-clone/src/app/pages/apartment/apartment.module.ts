import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentComponent } from './apartment.component';

import { NgIconsModule } from '@ng-icons/core';
import {
  ionHeart,
  ionHeartOutline,
  ionBedOutline,
  ionWifiOutline,
  ionTvOutline,
  ionSnowOutline,
  ionCafeOutline,
} from '@ng-icons/ionicons';

import { SharedResModule } from '../../shared/reservation/sharedRes.module';
import { SharedMapModule } from '../../shared/map/map.module';

@NgModule({
  declarations: [ApartmentComponent],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    NgIconsModule.withIcons({
      ionHeart,
      ionHeartOutline,
      ionBedOutline,
      ionWifiOutline,
      ionTvOutline,
      ionSnowOutline,
      ionCafeOutline,
    }),
    SharedResModule,
    SharedMapModule,
  ],
})
export class ApartmentModule {}
