import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Personal} from '../models/personal';

@Injectable()
export class PersonalService {

  private api = 'http://www.it-web.mx:3000';
  private servicio = '/Personal/';
  headers = new HttpHeaders({'Content-Type' : 'application/json'});
  private currEmpleado: Personal;

  constructor(private http: HttpClient) { }

  public getAllPersonal() {
    return this.http.get('http://www.it-web.mx:3000/Personal/').toPromise();
  }

  public setCurrEmpleado(emp: Personal) {
    this.currEmpleado = emp;
  }

  public getCurrEmpleado() {
    return this.currEmpleado;
  }

  public guardarEmpleado(emp: Personal) {
    console.log('Llamando a: ' + this.api + this.servicio);
    console.log('Reg. Empleado: => ', JSON.stringify(emp));
    return this.http.post(this.api + this.servicio, JSON.stringify(emp), {headers: this.headers}).toPromise();
  }
}
