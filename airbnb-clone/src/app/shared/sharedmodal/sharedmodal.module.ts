import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup/popup.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule],
  exports: [PopupComponent],
  providers: [NgbModalConfig, NgbModal],
})
export class SharedmodalModule {}
