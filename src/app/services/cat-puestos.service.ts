import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Puestos} from '../models/puestos';
import {of} from 'rxjs/observable/of';


@Injectable()
export class CatPuestosService {

  private url = 'http://localhost:3000/Puestos';
  private puestos: Puestos[];
  private currPuesto: Puestos;

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({'Content-Type' : 'application/json'});

  public setCurrPuesto(puesto: Puestos) {
    this.currPuesto = puesto;
  }

  public getCurrPuesto() {
    return this.currPuesto;
  }


  public getAllPuestos() {
    return this.http.get('http://localhost:8000/api/puestos').toPromise();
  }

  public getAllPuestosByArea(area: any) {
    return this.http.get('http://localhost:8000/api/areas/' + area + '/puestos').toPromise();
  }

  public getPuestoById(puesto: any) {
    return this.http.get('http://localhost:8000/api/puestos/' + puesto).toPromise();
  }

  public postCatPuestos(puesto: Puestos) {
    return this.http.post('http://localhost:8000/api/puestos', JSON.stringify(puesto), { headers: this.headers }).toPromise();
  }

  public putCatPuestos(puesto: Puestos) {
    return this.http.put('http://localhost:8000/api/puestos/' + puesto.id, JSON.stringify(puesto), {headers: this.headers}).toPromise();
  }

  public deleteCatPuestos(puesto: Puestos) {
    return this.http.delete('http://localhost:8000/api/puestos/' + puesto.id, {headers: this.headers}).toPromise();
  }

  private handleError<T> (operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('mensaje de error', message);
  }
}
