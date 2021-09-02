import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The line app';
  lines: any;
  //@Input() showForm: boolean;

  constructor(/*private http: HttpClient,*/ private accountService: AccountService){

  }
  ngOnInit(): void {
    //this.getLines();
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
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
