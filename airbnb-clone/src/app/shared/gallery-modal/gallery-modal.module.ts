import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery/gallery.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [GalleryComponent],
  imports: [CommonModule],
  exports: [GalleryComponent],
  providers: [NgbModalConfig, NgbModal],
})
export class GalleryModalModule {}
