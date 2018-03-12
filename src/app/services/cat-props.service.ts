import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CatPropsService {

  constructor(private http: HttpClient) { }

  public getAllProps() {
    return this.http.get('http://www.it-web.mx:3000/catProps').toPromise();
  }

  public getPropsById(id: number) {
    return this.http.get('http://www.it-web.mx:3000/catProps/?id=' + id).toPromise();
  }

}
