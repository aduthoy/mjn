import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Puestos} from '../models/puestos';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {observable} from 'rxjs/symbol/observable';

@Injectable()
export class CatPuestosService {

  private url = 'http://localhost:3000/Puestos';
  private puestos: Puestos[];
  private currPuesto: Puestos;

  constructor(private http: HttpClient) { }

  public getAllPuestos() {
    return this.http.get(this.url).toPromise();
  }

  public getAllPuestosByArea(area: any) {
    console.log('getPuestosByArea appi: http://localhost:3000/Puestos/?areaId=' + area);
    return this.http.get('http://www.it-web.mx:3000/Puestos/?areaId=' + area).toPromise();
   /*   .pipe(
      tap(_ => this.log(`buscando puestos del area ${area}`)),
      catchError(this.handleError('getPuestosByArea', []))*
    );*/
    /*console.log('Respuesta del Get => ', this.puestos);
    return this.puestos;*/
  }

  public getPuestoById(puesto: any) {
    return this.http.get('http://www.it-web.mx:3000/Puestos/?puestoId=' + puesto).toPromise();
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

  public setCurrPuesto(puesto: Puestos) {
    this.currPuesto = puesto;
  }

  public getCurrPuesto() {
    return this.currPuesto;
  }
}
