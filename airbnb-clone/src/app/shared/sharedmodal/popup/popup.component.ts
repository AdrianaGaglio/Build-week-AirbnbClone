import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  activeModal = inject(NgbActiveModal);
  @Input() message!: string;
  @Input() isOk!: boolean;

  close() {
    this.activeModal.close();
  }
}
