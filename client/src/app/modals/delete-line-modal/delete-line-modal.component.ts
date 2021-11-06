import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-line-modal',
  templateUrl: './delete-line-modal.component.html',
  styleUrls: ['./delete-line-modal.component.css']
})
export class DeleteLineModalComponent  {
  message?: string;
  @Output() notifyParent: EventEmitter<boolean> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) { }

  confirm(): void {
    this.notifyParent.emit(true);
    this.bsModalRef?.hide();
  }
 
  decline(): void {
    this.bsModalRef?.hide();
  }

}
