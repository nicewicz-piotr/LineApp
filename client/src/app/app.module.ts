import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RegisterComponent } from './register/register.component';
//import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LineListComponent } from './lines/line-list/line-list.component';
import { LineDetailComponent } from './lines/line-detail/line-detail.component';
import { HomeComponent } from './home/home.component';
//import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotificationListComponent } from './lines/notification-list/notification-list.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { DeleteLineModalComponent } from './modals/delete-line-modal/delete-line-modal.component';
import { InsertLineModalComponent } from './modals/insert-line-modal/insert-line-modal.component';
import { NumberInputComponent } from './_forms/number-input/number-input.component';
import { TextareaInputComponent } from './_forms/textarea-input/textarea-input.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { RegisterModalComponent } from './modals/register-modal/register-modal.component'; 
import { ClickOutsideDirective } from './ClickOutsideDirective';
import { EditLineModalComponent } from './modals/edit-line-modal/edit-line-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    LineListComponent,
    LineDetailComponent,
    HomeComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    NotificationListComponent,
    TextInputComponent,
    DateInputComponent,
    DeleteLineModalComponent,
    InsertLineModalComponent,
    NumberInputComponent,
    TextareaInputComponent,
    SidebarComponent,
    LoginModalComponent,
    RegisterModalComponent,
    ClickOutsideDirective,
    EditLineModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
