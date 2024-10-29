import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HostRoutingModule } from './host-routing.module';
import { HostComponent } from './host.component';
import { SharedModule } from '../../shared/shared.module';
import { ReviewComponent } from './components/review/review.component';
import { SharedResModule } from '../../shared/reservation/sharedRes.module';

@NgModule({
  declarations: [HostComponent, ReviewComponent],
  imports: [CommonModule, HostRoutingModule, SharedModule, SharedResModule],
})
export class HostModule {}
