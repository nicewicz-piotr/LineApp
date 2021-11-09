import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { expandCollapse } from './_animations/expand-collapse';
import { slideInOut } from './_animations/slide-in-out';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    expandCollapse,
    slideInOut
  ]
})
export class AppComponent implements OnInit {
  title = 'The line app';
  lines: any;
  menuState:string='out';
  //@Input() showForm: boolean;



  //model: any = {}
  showRegisterForm: boolean = false;
  navbarOpen: boolean = false;




  constructor(/*private http: HttpClient,*/ private accountService: AccountService,
    
    private router: Router,
    private toastr: ToastrService

    ){

  }

  ngOnInit(): void {
    //this.getLines();
    //this.menuState='out';
    this.setCurrentUser();      
  }

  toggleMenuState(menuState: any){
      console.log(menuState);
      this.menuState = menuState;
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }







  /*

  login(){
    this.showRegisterForm = false;
    
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl('/lines');
      
    } )
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  registerFormToggle() {
    console.log('register nav button');
    this.showRegisterForm = !this.showRegisterForm;
    console.log(this.showRegisterForm);
  }

  */

/*
  getLines(){
    this.http.get('https://localhost:5001/api/lines').subscribe(response => {
      this.lines = response;
    }, error => {
      console.log(error);
    })
  }
  */
}
