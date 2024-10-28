import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import { HostComponent } from './host.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HostComponent],
  imports: [CommonModule, HostRoutingModule, SharedModule],
})
export class HostModule {}
