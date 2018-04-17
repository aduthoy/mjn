import {HttpInterceptor, HttpRequest, HttpHeaders, HttpUserEvent, HttpEvent, HttpHandler} from '@angular/common/http';
import { observable } from 'rxjs/symbol/observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../services/login.service';


@Injectable()
export class AuthInterceptor implements  HttpInterceptor {

  constructor(private  router: Router, private svrLogin: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    if (this.svrLogin.token !== null || this.svrLogin.token !== undefined) {
      const clonedreq = req.clone({
        headers: req.headers.set('Authentication', 'Bearer ' + this.svrLogin.token)
      });
      return next.handle(clonedreq)
        .do (
        succ => { },
        err => {
          if (err.status === 401) {
            this.router.navigateByUrl('/user');
          }
        }
      );
    } else {
      this.router.navigateByUrl('/user');
    }
  }
}
