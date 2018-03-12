import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CatStatusService {

  constructor(private http: HttpClient) { }

  public getAllCatStatus(): Promise<Object> {
    return this.http.get('http://www.it-web.mx:3000/CatStatus').toPromise();
  }

  public getCatStatusById (id: number) {
    return this.http.get('http://www.it-web.mx:3000/CatStatus/?id=' + id).toPromise();
  }
}
