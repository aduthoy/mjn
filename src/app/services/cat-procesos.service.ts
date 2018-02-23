import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CatProcesosService {

  constructor(private http: HttpClient) { }

  public getAllProcesos() {
    return this.http.get('http://localhost:3000/catProcesos').toPromise();
  }

  public getProcesoById(id: number) {
    return this.http.get('http://localhost:3000/catProcesos/?id=' + id).toPromise();
  }

}
