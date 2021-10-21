import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() showForm: boolean;
  @Output() showFormChange = new EventEmitter<boolean>();
  
  //collapse: boolean;
  //@Input() collapse: boolean;
  //@Output() collapseChange = new EventEmitter<boolean>();
  model: any = {};
  registerForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService,
              private toastr: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), 
        Validators.maxLength(10), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])/)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      company: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required]
    })
    //this.registerForm.controls.password.valueChanges.subscribe(() => {
    //  this.registerForm.controls.confirmPassword.updateValueAndValidity();
    //})
  }
  
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register(){
    console.log(this.registerForm.value);
    this.accountService.register(this.registerForm.value).subscribe(response => {
      console.log(response);
      this.showFormChange.emit(this.showForm = false);
      this.router.navigateByUrl('/');
      this.toastr.success("Successfully registered", "Success");
      //this.cancel();
    }, error => {
      console.log(error);
      this.validationErrors = error;
      //this.toastr.error(error.error);
    })
  }

  cancel(){
    this.showFormChange.emit(this.showForm = false);
    this.router.navigateByUrl('/');
    //console.log(this.collapse);
    //this.collapseChange.emit(this.collapse = true);
    //console.log('cancel');
  }

}
