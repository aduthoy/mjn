import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CatEstatusService {

  constructor(private http: HttpClient) { }

  public getAllCatEstatus(){
    return this.http.get('http://localhost:3000/CatEstatus').toPromise();
  }

  public getCatEstatusById(id: number) {
    return this.http.get('http://localhost:3000/CatEstatus/?id=' + id).toPromise();
  }
}
