import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Catpdms} from '../models/catpdms';

@Injectable()
export class CatPdmService {
  private currPDM: Catpdms;

  constructor(private http: HttpClient) { }

  public getAllPdms() {
    return this.http.get('http://localhost:3000/catpdms').toPromise();
  }

  public  getPdmById(id: string) {
    return this.http.get('http://localhost:3000/catpdms/?codigoactual=' + id).toPromise();
  }

  public getcurrPDM(): Catpdms {
    return this.currPDM;
  }

  public setcurrPDM(value: Catpdms) {
    this.currPDM = value;
  }

}
