import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule} from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


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
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    PaginationModule,
    ButtonsModule,
    BsDatepickerModule
  ]
})
export class SharedModule { }
