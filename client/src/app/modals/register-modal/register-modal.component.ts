import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {

  registerForm: FormGroup;
  validationErrors: string[] = [];

  @Output() notifyParent: EventEmitter<any> = new EventEmitter(); //any!!! to type

  constructor(public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  confirm(): void{
    console.log(this.registerForm.value);
    this.notifyParent.emit(this.registerForm.value);
    this.bsModalRef?.hide();
  }

  cancel(): void {
    this.bsModalRef?.hide();
  }

  initializeForm(){
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), 
        Validators.maxLength(10), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])/)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      company: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[- +()0-9]{6,}')]],
      //phoneNumber: ['', [Validators.required, this.regexValidator(new RegExp('[- +()0-9]{6,}'), {'phone': ''})]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

}
