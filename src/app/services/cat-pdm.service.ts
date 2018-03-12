import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Catpdms} from '../models/catpdms';


@Injectable()
export class CatPdmService {
  private currPDM: Catpdms;
  headers = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  public getcurrPDM(): Catpdms {
    return this.currPDM;
  }

  public setcurrPDM(value: Catpdms) {
    this.currPDM = value;
  }

  public getAllPdms() {
    return this.http.get('http://localhost:8000/api/pdms').toPromise();
  }

  public  getPdmById(id: string) {
    return this.http.get('http://localhost:8000/api/pdms/' + id).toPromise();
  }

  public postPdm(curso: Catpdms) {
    return this.http.post('http://localhost:8000/api/pdms', JSON.stringify(curso), { headers: this.headers }).toPromise();
  }

  public putPdm(curso: Catpdms) {
    return this.http.put('http://localhost:8000/api/pdms/' + curso.id, JSON.stringify(curso), {headers: this.headers}).toPromise();
  }

  public deletePdm(curso: Catpdms) {
    return this.http.delete('http://localhost:8000/api/pdms/' + curso.id, {headers: this.headers}).toPromise();
  }
}
