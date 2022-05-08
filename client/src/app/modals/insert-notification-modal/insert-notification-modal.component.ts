import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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

    let extensions: string[] = ['jpg','bmp','png'];  
    this.insertNotificationForm = this.formBuilder.group({
      description: ['', Validators.required],
      photos: ['', [this.requiredFileType(extensions)]]
    })
  }

  requiredFileType(type: string[]): ValidatorFn {
    return (control: AbstractControl) => {

      const files = control.value as FileList;
      let elements: string[] =[];
      
      Array.from(files).forEach(element => {
        let extension: string = element.name.split('.')[1].toLowerCase();
        elements.push(extension);
      });
      
        const containsAll = elements.every(element => {
           return type.includes(element);
        });
      
      return (containsAll) ? null : {requiredFileType: containsAll};
     
    }
  }
}
