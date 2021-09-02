import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left', preventDuplicates: true, timeOut: 10000,
      progressAnimation: 'increasing', progressBar: true
    }),
    PaginationModule.forRoot()
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    PaginationModule
  ]
})
export class SharedModule { }
