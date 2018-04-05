import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  logedin: boolean;
  administrador: boolean;
  username: string;
  userId: number;
  token: string;

  constructor() { }

  public doLogin( email: string, password: string) {
    if ((email === 'aduthoy@gmail.com') && (password === 'coco240492')) {
      this.username = 'Alberto Duthoy González';
      this.userId = 1;
      this.logedin = true;
      this.administrador = false;
    } else if ((email === 'gabriela.martinezamparan@rb.com') && (password === 'gmartineza')) {
      this.username = 'Gabriela Martinez Amparan';
      this.userId = 9;
      this.logedin = true;
      this.administrador = true;
    } else {
      this.logedin = false;
    }
  }

  public doLogout() {
    this.logedin = false;
    this.administrador = false;
    this.token = '';
  }
}
