import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ForgotPassword } from 'src/app/_models/forgotPassword';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';

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
              private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private accountService: AccountService,
              private toastr: ToastrService) { }

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

  openForgotPasswordModal(){
    this.bsModalRef = this.modalService.show(ForgotPasswordModalComponent, {animated: true, class: 'modal-lg'});
    this.bsModalRef.content.notifyParent.subscribe((result: ForgotPassword) => {
      this.forgotPassword(result);
    })
  }

  forgotPassword(forgotPass:  ForgotPassword){
    this.accountService.forgotPassword(forgotPass).subscribe(() => {
      this.toastr.success("E-mail has been sent");
    })
  }
  

}
