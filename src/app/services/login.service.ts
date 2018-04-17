import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Users} from '../models/users';

@Injectable()
export class LoginService {

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  logedin: boolean;
  administrador: boolean;
  token: string;
  currUser: Users;

  constructor(private http: HttpClient) { }

  public doLogin(credenciales: any) {

    console.log('Credenciales:', credenciales);
    return this.http.post('http://localhost:8000/api/authenticate', JSON.stringify(credenciales), { headers: this.headers })
      .toPromise();
  }

  public getUserInfoByEMail(credenciales: any) {
    return this.http.post('http://localhost:8000/api/user/getUserInfoByEMail', JSON.stringify(credenciales), { headers: this.headers })
      .toPromise();
  }

  public updateUserById(user: Users) {
    return this.http.put('http://localhost:8000/api/user/updateUserById/' + this.currUser.id, JSON.stringify(this.currUser),
      { headers: this.headers}).toPromise();
  }

  public doLogout() {
    this.logedin = false;
    this.administrador = false;
    this.token = '';
  }
}
