import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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

  @Output() confirm = new EventEmitter<boolean>();

  confirmBtn(confirm: boolean) {
    this.confirm.emit(confirm);
    this.close();
  }

  close() {
    this.activeModal.close();
  }
}
