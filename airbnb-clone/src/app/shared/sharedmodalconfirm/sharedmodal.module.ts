import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupConfirmComponent } from './popup-confirm/popup-confirm.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [PopupConfirmComponent],
  imports: [CommonModule],
  exports: [PopupConfirmComponent],
  providers: [NgbModalConfig, NgbModal],
})
export class SharedmodalModule {}
