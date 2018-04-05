import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {LoginService} from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private svrLogin: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     if (this.svrLogin.logedin === true) {
       return true;
     }
     this.router.navigate(['/user']);
     return false;
  }
}
