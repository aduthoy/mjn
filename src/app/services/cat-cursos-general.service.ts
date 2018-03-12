import { Injectable } from '@angular/core';
import {CatCapGeneral} from '../models/cat-cap-general';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CatCursosGeneralService {
  private currCursoGeneral: CatCapGeneral;

  headers = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  public getCurrCursoGeneral(): CatCapGeneral {
    return this.currCursoGeneral;
  }

  public setCurrCursoGeneral(value: CatCapGeneral) {
    this.currCursoGeneral = value;
  }

  public getAllCursosCapGeneral() {
    return this.http.get('http://localhost:8000/api/generaltrainings').toPromise();
  }

  public  getCursoCapGeneralById(id: string) {
    return this.http.get('http://www.it-web.mx:3000/catcursosgeneral/?idCurso=' + id).toPromise();
  }

  public postCursoGeneral(curso: CatCapGeneral) {
    return this.http.post('http://localhost:8000/api/generaltrainings', JSON.stringify(curso), { headers: this.headers }).toPromise();
  }

  public putCursoGeneral(curso: CatCapGeneral) {
    return this.http.put('http://localhost:8000/api/generaltrainings/' + curso.id, JSON.stringify(curso), {headers: this.headers}).toPromise();
  }

  public deleteCursoGenera(curso: CatCapGeneral) {
    return this.http.delete('http://localhost:8000/api/generaltrainings/' + curso.id, {headers: this.headers}).toPromise();
  }
}
