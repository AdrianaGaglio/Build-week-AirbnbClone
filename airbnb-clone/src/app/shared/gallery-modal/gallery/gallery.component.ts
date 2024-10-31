import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  activeModal = inject(NgbActiveModal);
  @Input() allImg!: string[];

  ngOnInit(): void {
    console.log(this.allImg);
  }

  close() {
    this.activeModal.close();
  }
}
