import { Injectable } from '@angular/core';
import {CatCapGeneral} from '../models/cat-cap-general';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CatCursosGeneralService {
  private currCursoGeneral: CatCapGeneral;

  constructor(private http: HttpClient) { }

  public getAllCursosCapGeneral() {
    return this.http.get('http://localhost:3000/catcursosgeneral').toPromise();
  }

  public  getCursoCapGeneralById(id: string) {
    return this.http.get('http://localhost:3000/catcursosgeneral/?idCurso=' + id).toPromise();
  }

  public getCurrCursoGeneral(): CatCapGeneral {
    return this.currCursoGeneral;
  }

  public setCurrCursoGeneral(value: CatCapGeneral) {
    this.currCursoGeneral = value;
  }
}
