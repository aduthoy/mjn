import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Personal} from '../models/personal';

@Injectable()
export class PersonalService {

  headers = new HttpHeaders({'Content-Type' : 'application/json'});
  private currEmpleado: Personal;

  constructor(private http: HttpClient) { }

  public setCurrEmpleado(emp: Personal) {
    this.currEmpleado = emp;
  }

  public getCurrEmpleado() {
    return this.currEmpleado;
  }

  public getAllPersonal() {
    return this.http.get('http://localhost:8000/api/personal').toPromise();
  }


  public  getPersonalById(id: string) {
    return this.http.get('http://localhost:8000/api/personal/' + id).toPromise();
  }

  public postPersonal(personal: Personal) {
    return this.http.post('http://localhost:8000/api/personal', JSON.stringify(personal),
      { headers: this.headers }).toPromise();
  }

  public putPersonal(personal: Personal) {
    return this.http.put('http://localhost:8000/api/personal/' + personal.id, JSON.stringify(personal),
      {headers: this.headers}).toPromise();
  }

  public deletePersonal(personal: Personal) {
    return this.http.delete('http://localhost:8000/api/personal/' + personal.id, {headers: this.headers}).toPromise();
  }
}
