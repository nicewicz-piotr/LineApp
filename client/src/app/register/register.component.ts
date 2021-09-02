import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private accountService: AccountService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {

  }

  register(){
    //console.log(this.model);
    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
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
