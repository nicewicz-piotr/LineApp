import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { RegisterModalComponent } from '../modals/register-modal/register-modal.component';
import { Login } from '../_models/login';
import { Register } from '../_models/register';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() menuStateEvent: EventEmitter<string> = new EventEmitter();
  @Input() menuState: string;

  bsModalRef: BsModalRef; 
  
  constructor(public accountService: AccountService, //private??
              private router: Router,
              private toastr: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.menuStateEvent.emit(this.menuState);
  }

  login(model: Login){
    
    this.accountService.login(model).subscribe(response => {
      console.log(response);
      this.toastr.success("Successfully logged-in");
      //this.router.navigateByUrl('/lines');
    } , error => {
      console.log(error);
      //this.toastr.error(error.error);
    })
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  register(model: Register){
    this.accountService.register(model).subscribe(response => {
      console.log(response);
      //this.router.navigateByUrl('/');
      this.toastr.success("Successfully registered");
      //this.cancel();
    }, error => {
      console.log(error);
      //this.validationErrors = error;
      //this.toastr.error(error.error);
    })
  }

  openLoginModal(){
    this.bsModalRef = this.modalService.show(LoginModalComponent, {animated: true, class: 'modal-lg'});
    this.bsModalRef.content.notifyParent.subscribe((result: Login) => {
      console.log(result);
      this.login(result);
    })
  }

  openRegisterModal(){
    this.bsModalRef = this.modalService.show(RegisterModalComponent, {animated: true, class: 'modal-lg'});
    this.bsModalRef.content.notifyParent.subscribe((result: Register) => {
      console.log(result);
      this.register(result);
    })
  }


}
