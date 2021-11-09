import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { expandCollapse } from '../_animations/expand-collapse';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() menuStateEvent: EventEmitter<string> = new EventEmitter();
  menuState: any = 'out';
  

  model: any = {}
  showRegisterForm: boolean = false;
  navbarOpen: boolean = false;
  
  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.menuState = this.menuState === 'in' ? 'out' : 'in';
    //console.log(this.menuState);
    this.menuStateEvent.emit(this.menuState);
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

}
