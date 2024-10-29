import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentComponent } from './apartment.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionHeart, ionHeartOutline } from '@ng-icons/ionicons';

@NgModule({
  declarations: [ApartmentComponent, ReservationComponent],
  imports: [
    CommonModule,
    ApartmentRoutingModule,
    NgIconsModule.withIcons({ ionHeart, ionHeartOutline }),
  ],
})
export class ApartmentModule {}
