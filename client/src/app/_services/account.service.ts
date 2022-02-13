import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ForgotPassword } from '../_models/forgotPassword';
import { Login } from '../_models/login';
import { Register } from '../_models/register';
import { ResetPassword } from '../_models/resetPassword';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  
  private currentUserSource = new ReplaySubject<User>(1); //buffer of one last value
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: Login){
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response : User) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user)); //set user to localstorage as key value pair
          this.currentUserSource.next(user); //
        }
        //return user;
      })
    );
  }

  public forgotPassword = (model: ForgotPassword) => {
    return this.http.post(this.baseUrl + 'account/forgotpassword', model);
  }

  public resetPassword = (model: ResetPassword) => {
    return this.http.post(this.baseUrl + 'account/resetpassword', model);
  }

  register(model: Register){
    return this.http.post(this.baseUrl + 'account/register', model);
  }
  /*
  register(model: any){
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user)); //set user to localstorage as key value pair
          this.setCurrentUser(user);
        }
        return user;
      })
    )
  }
  */

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user'); //remove user from localstorage
    this.currentUserSource.next(null); 
  }
}
