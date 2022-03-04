import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Notification } from "../../_models/notification";

@Component({
  selector: 'app-insert-notification-modal',
  templateUrl: './insert-notification-modal.component.html',
  styleUrls: ['./insert-notification-modal.component.css']
})
export class InsertNotificationModalComponent implements OnInit {

  insertNotificationForm: FormGroup;
  validationErrors: string[] = [];
  notification: Notification;
  
  @Output() notifyParent: EventEmitter<Notification> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  confirm(): void {
    console.log(this.insertNotificationForm.value);
    this.notifyParent.emit(this.insertNotificationForm.value);
    this.bsModalRef?.hide();
  }
 
  cancel(): void {
    this.bsModalRef?.hide();
  }


  initializeForm(){

    this.insertNotificationForm = this.formBuilder.group({
      //symbol: ['', Validators.required],
      //length: ['' , [Validators.required, Validators.pattern("^(0|[1-9]\\d*)(\\.\\d+)?$")]],
      description: ['', Validators.required],
    })
    //this.registerForm.controls.password.valueChanges.subscribe(() => {
    //  this.registerForm.controls.confirmPassword.updateValueAndValidity();
    //})
    console.log(this.insertNotificationForm.value);
    //this.insertLineForm.get('length').value;
  }

}
