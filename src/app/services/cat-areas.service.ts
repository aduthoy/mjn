import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatAreas} from '../models/cat-areas';

@Injectable()
export class CatAreasService {
  private currArea: CatAreas;
  constructor(private http: HttpClient) { }

  public getAllCatAreas() {
    return this.http.get('http://localhost:3000/catAreas').toPromise();
  }

  public getCatAreasById(id: number) {
    return this.http.get('http://localhost:3000/CatAreas/?id=' + id).toPromise();
  }

  public setCurrArea(area: CatAreas) {
    this.currArea = area;
  }

  public getCurrArea() {
    return this.currArea;
  }
}
