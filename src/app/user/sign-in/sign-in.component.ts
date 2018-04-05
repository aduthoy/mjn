import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {DialogmessageComponent} from '../../dialogmessage/dialogmessage.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private svrlogin: LoginService, private msgDialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('', [Validators.required]),
      loginPassword: new FormControl('', [Validators.required]),
    });
  }


  doLogin() {
    this.svrlogin.doLogin(this.loginForm.value.loginEmail, this.loginForm.value.loginPassword);
    if (this.svrlogin.logedin) {
        this.router.navigate(['/dashboard']);
    } else  {
      this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Credenciales Inválidas. Favor de verificar.', icono: 1, dialogtype: 1}});
    }
  }
}
