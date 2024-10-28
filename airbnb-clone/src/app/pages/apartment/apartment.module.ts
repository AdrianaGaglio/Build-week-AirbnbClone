import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentRoutingModule } from './apartment-routing.module';
import { ApartmentComponent } from './apartment.component';


@NgModule({
  declarations: [
    ApartmentComponent
  ],
  imports: [
    CommonModule,
    ApartmentRoutingModule
  ]
})
export class ApartmentModule { }
