import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {DialogmessageComponent} from '../../dialogmessage/dialogmessage.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {Users} from '../../models/users';
import {HttpErrorResponse} from '@angular/common/http';

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
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }


  doLogin() {
    console.log('Mandando a Autenticar el usuario');
    this.svrlogin.currUser = new Users();
    this.svrlogin.doLogin(this.loginForm.value).then( (a: any) => {
      console.log('Retorno ', a);
      this.svrlogin.token = a.token;
      this.svrlogin.logedin = true;
      console.log('token', this.svrlogin.token);
      this.svrlogin.getUserInfoByEMail(this.loginForm.value).then((b: Users[]) => {
        this.svrlogin.currUser = b[0];
        this.svrlogin.administrador = this.svrlogin.currUser.administrador;
        this.svrlogin.currUser.token = this.svrlogin.token;
        console.log('se obtuvo la info del usuario ', b[0]);
        this.svrlogin.updateUserById(this.svrlogin.currUser).then((c: any) => {
          console.log('Actualizando el último Ingreso');
          console.log('Usuario Actual = ', this.svrlogin.currUser);
          this.router.navigate(['/dashboard']);
        });
      });
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.svrlogin.logedin = false;
      this.svrlogin.administrador = false;
      this.svrlogin.token = '';
      this.svrlogin.currUser = new Users();
      this.msgDialog.open(DialogmessageComponent,
        {
          data: {mensaje: 'Credenciales Inválidas. Favor de verificar.', icono: 1, dialogtype: 1}
        });
    });
  }
}
