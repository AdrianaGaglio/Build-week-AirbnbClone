import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentComponent } from './apartment.component';
import { ReservationComponent } from './components/reservation/reservation.component';


@NgModule({
  declarations: [
    ApartmentComponent,
    ReservationComponent
  ],
  imports: [
    CommonModule,
    ApartmentRoutingModule
  ]
})
export class ApartmentModule { }
