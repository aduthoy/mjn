import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import {LoginService} from './services/login.service';
import {Router, RouterLink} from '@angular/router';


/** Manejador de Errores de la Forma */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (public svrLogin: LoginService, private router: Router) {

  }

  public dologout() {
    this.svrLogin.doLogout();
    this.router.navigate(['/']);
  }
}
