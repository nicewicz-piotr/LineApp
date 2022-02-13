import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword } from '../_models/resetPassword';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetPasswordComponent implements OnInit {

  private token: string;
  private email: string;
  private password: string;
  private confirmPassword: string;
  resetForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), 
        Validators.maxLength(10), Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])/)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  confirm(): void {

    this.token = this.route.snapshot.queryParams['token'];
    this.email = this.route.snapshot.queryParams['email'];

    this.password = this.resetForm.get('password').value; 
    this.confirmPassword = this.resetForm.get('confirmPassword').value;     

    const resetPass: ResetPassword = {
      password: this.password,
      confirmPassword: this.confirmPassword,
      token: this.token,
      email: this.email
    }

    this.accountService.resetPassword(resetPass).subscribe(() => {
      this.toastr.success("Your password has been changed");
      this.router.navigateByUrl('/');
    })

  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

}
