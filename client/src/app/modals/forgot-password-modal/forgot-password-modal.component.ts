import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ForgotPassword } from 'src/app/_models/forgotPassword';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent implements OnInit {

  forgotForm: FormGroup;
  //validationErrors: string[] = [];
  baseUrl = environment.apiUrl;
  //public successMessage: string;
  //public errorMessage: string;
  //public showSuccess: boolean;
  //public showError: boolean;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter(); //any!!! to type

  constructor(public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.initializeForm();
    }
  
    confirm(): void{
      console.log(this.forgotForm.value);
      this.notifyParent.emit(this.forgotForm.value);
      this.bsModalRef?.hide();
    }
  
    cancel(): void {
      this.bsModalRef?.hide();
    }
  
    initializeForm(){
      this.forgotForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        clientURI: 'https://localhost:4200/resetpassword'
      })
    }

    /*
    public forgotPassword = (forgotPasswordFormValue) => {

      this.showError = this.showSuccess = false;

      const forgotPass = { ...forgotPasswordFormValue };

      const forgotPassDto: ForgotPassword = {
        email: forgotPass.email,
        clientURI: 'http://localhost:4200/authentication/resetpassword'
      }
  
    }
    */

}
