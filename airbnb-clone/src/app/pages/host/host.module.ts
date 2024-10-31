import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import { HostComponent } from './host.component';
import { SharedModule } from '../../shared/shared.module';
import { SharedResModule } from '../../shared/reservation/sharedRes.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HostComponent],
  imports: [
    CommonModule,
    HostRoutingModule,
    SharedModule,
    SharedResModule,
    ReactiveFormsModule,
  ],
})
export class HostModule {}
