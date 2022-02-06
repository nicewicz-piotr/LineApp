import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, 
              private toastr: ToastrService){

  }
  canActivate(): Observable<boolean>  {
    return this.accountService.currentUser$.pipe(
      map(user => {
        //console.log("Czy token wygasł: ", this.tokenExpired( user.token))
        
        //this.getDecodedToken(user.token)
        console.log("auth guard")

        if(this.tokenExpired(user?.token))
          this.accountService.logout();
        
        if(user && !this.tokenExpired(user?.token)) return true; //add condition to expiring token
        this.toastr.error('No access');
      })
    )
  }

  private tokenExpired(token: string| null) {
    if(token == null) return false;
    else {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
  }

  getDecodedToken(token){
    return JSON.parse(atob(token.split('.')[1]));
  }
  
}
