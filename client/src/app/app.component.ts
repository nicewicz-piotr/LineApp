import { Component, Input, OnInit } from '@angular/core';
import { expandCollapse } from './_animations/expand-collapse';
import { slideInOut } from './_animations/slide-in-out';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInOut
  ]
})
export class AppComponent implements OnInit {

  title = 'The line app';

  menuState:string='out';
  firstTime: boolean = false;

  constructor(private accountService: AccountService){
  }

  ngOnInit(): void {
    this.setCurrentUser();      
  }

  toggleMenuState(menuState: string){
      this.menuState = menuState;
      this.firstTime = true;
  }

  closeMenu(){
    if( this.menuState === 'in'){
     this.menuState = 'out';
    }
    this.firstTime = false;
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
