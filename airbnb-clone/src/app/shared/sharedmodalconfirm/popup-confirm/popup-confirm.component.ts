import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup-confirm.component.html',
  styleUrl: './popup-confirm.component.scss',
})
export class PopupConfirmComponent {
  activeModal = inject(NgbActiveModal);
  @Input() message!: string;
  @Input() isOk!: boolean;

  close() {
    this.activeModal.close();
  }
}
