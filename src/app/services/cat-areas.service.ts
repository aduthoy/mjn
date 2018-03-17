import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CatAreas} from '../models/cat-areas';


@Injectable()
export class CatAreasService {
  private currArea: CatAreas;
  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({'Content-Type' : 'application/json'});

  public setCurrArea(area: CatAreas) {
    this.currArea = area;
  }

  public getCurrArea() {
    return this.currArea;
  }

  public getAllCatAreas() {
    return this.http.get('http://localhost:8000/api/areas').toPromise();
  }

  public getCatAreasById(id: number) {
    return this.http.get('http://localhost:8000/api/areas/' + id).toPromise();
  }

  public postCatAreas(area: CatAreas) {
    return this.http.post('http://localhost:8000/api/areas', JSON.stringify(area), { headers: this.headers }).toPromise();
  }

  public putCatAras(area: CatAreas) {
    return this.http.put('http://localhost:8000/api/areas/' + area.id, JSON.stringify(area), {headers: this.headers}).toPromise();
  }

  public deleteCatAreas(area: CatAreas) {
    return this.http.delete('http://localhost:8000/api/areas/' + area.id, {headers: this.headers}).toPromise();
  }

}
