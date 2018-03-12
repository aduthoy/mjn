import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatAreas} from '../models/cat-areas';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CatAreasService {
  private currArea: CatAreas;
  constructor(private http: HttpClient) { }

  public getAllCatAreas() {
    return this.http.get('http://www.it-web.mx:3000/CatAreas').toPromise();
  }


  public getCatAreasById(id: number) {
    return this.http.get('http://www.it-web.mx:3000/CatAreas/?idArea=' + id).toPromise();
  }

  public setCurrArea(area: CatAreas) {
    this.currArea = area;
  }

  public getCurrArea() {
    return this.currArea;
  }
}
