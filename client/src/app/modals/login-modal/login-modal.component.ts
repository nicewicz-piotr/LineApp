import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  loginForm: FormGroup;
  validationErrors: string[] = [];

  @Output() notifyParent: EventEmitter<any> = new EventEmitter(); //any!!! to type

  constructor(public bsModalRef: BsModalRef,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  confirm(): void {
    console.log(this.loginForm.value);
    this.notifyParent.emit(this.loginForm.value);
    this.bsModalRef?.hide();
  }
 
  cancel(): void {
    this.bsModalRef?.hide();
  }

  initializeForm(){

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  

}
