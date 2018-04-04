import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  logedin: boolean;

  username: string;
  token: string;

  constructor() { }

}
