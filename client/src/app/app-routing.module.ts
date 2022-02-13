import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { HomeComponent } from './home/home.component';
import { LineDetailComponent } from './lines/line-detail/line-detail.component';
import { LineListComponent } from './lines/line-list/line-list.component';
import { ForgotPasswordModalComponent } from './modals/forgot-password-modal/forgot-password-modal.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'forgotpassword', component: ForgotPasswordModalComponent}, //?? - czy potrzebne
  {path: 'resetpassword', component: ResetPasswordComponent }, 
  {path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'lines', component: LineListComponent},
      {path: 'lines/:id', component: LineDetailComponent},   
    ]
  },
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
