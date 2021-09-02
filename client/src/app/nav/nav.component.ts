import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {}
//isCollapsed = true;
//currentUser$: Observable<User>;
//loggedIn: boolean;
showRegisterForm: boolean = false;

//@Output() showFormChange = new EventEmitter<boolean>();

constructor(public accountService: AccountService, 
            private router: Router,
            private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
    //this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    //this.isCollapsed = true;
    this.showRegisterForm = false;
    
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/lines');
      //this.loggedIn = true;
    } /*, error => {
      console.log(error);
      this.toastr.error(error.error);
    }*/)
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
    //this.loggedIn = false;
  }

  registerFormToggle() {
    console.log('register nav button');
    this.showRegisterForm = !this.showRegisterForm;
    console.log(this.showRegisterForm);
    //this.showFormChange.emit(this.showRegisterForm);
  }

  //getCurrentUser(){
    //this.accountService.currentUser$.subscribe(user => {
      //this.loggedIn = !!user;
    //}, error => {
      //console.log(error);
    //})
 // }

}
