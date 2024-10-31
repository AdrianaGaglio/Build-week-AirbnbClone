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
import {
  matLocalLaundryService,
  matKitchen,
  matMicrowave,
  matPets,
  matWaves,
  matCleaningServices,
  matHelpCenter,
  matLandscape,
  matRoomService,
  matLocalBar,
  matBakeryDining,
  matBlender,
} from '@ng-icons/material-icons/baseline';

import { SharedResModule } from '../../shared/reservation/sharedRes.module';
import { SharedMapModule } from '../../shared/map/map.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ApartmentComponent],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      ionHeart,
      ionHeartOutline,
      ionBedOutline,
      ionWifiOutline,
      ionTvOutline,
      ionSnowOutline,
      ionCafeOutline,
      matLocalLaundryService,
      matKitchen,
      matMicrowave,
      matPets,
      matWaves,
      matCleaningServices,
      matHelpCenter,
      matLandscape,
      matRoomService,
      matLocalBar,
      matBakeryDining,
      matBlender,
    }),
    SharedResModule,
    SharedMapModule,
    SharedModule,
  ],
})
export class ApartmentModule {}
