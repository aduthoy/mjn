import { Injectable } from '@angular/core';
import {CatCapEspecifica} from '../models/cat-cap-especifica';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CatCapGeneral} from '../models/cat-cap-general';

@Injectable()
export class CatCursosEspecificosService {

  currCurEspecifico: CatCapEspecifica;

  headers = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }

  public setCurrCursoEspecifio(curso: CatCapEspecifica) {
    this.currCurEspecifico = curso;
  }

  public  getCurrCursoEspecifio(): CatCapEspecifica {
    return this.currCurEspecifico;
  }

  public getAllCursosEspecificos() {
    return this.http.get('http://localhost:8000/api/specifctrainings').toPromise();
  }

  public getCursoEspecificoById(id: string) {
    return this.http.get('http://localhost:8000/api/specifctrainings/' + id).toPromise();
  }

  public postCursoEspecifico(curso: CatCapEspecifica) {
    return this.http.post('http://localhost:8000/api/specifctrainings', JSON.stringify(curso), { headers: this.headers }).toPromise();
  }

  public putCursoEspecifico(curso: CatCapEspecifica) {
    return this.http.put('http://localhost:8000/api/specifctrainings/' + curso.id, JSON.stringify(curso), {headers: this.headers}).toPromise();
  }

  public deleteCursoEspecifico(curso: CatCapEspecifica) {
    return this.http.delete('http://localhost:8000/api/specifctrainings/' + curso.id, {headers: this.headers}).toPromise();
  }
}
