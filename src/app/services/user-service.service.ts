import { Injectable } from '@angular/core';
import {Users} from '../models/users';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class UserServiceService {

  Usuarios: Array<Users>;

  constructor( private httpCliente: HttpClient) {
    //this.httpCliente.get('https://jsonplaceholder.typicode.com/users').subscribe(resp => this.Usuarios = resp.json());
    this.httpCliente.get('https://jsonplaceholder.typicode.com/users').subscribe(
      (data: any[]) => {
        console.log('usuarios en el servicio',data);
      }
    );
  }

}
