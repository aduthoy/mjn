import { Injectable } from '@angular/core';
import {CatCapEspecifica} from '../models/cat-cap-especifica';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CatCursosEspecificosService {

  currCurEspecifico: CatCapEspecifica;

  constructor(private http: HttpClient) { }

  public getAllCursosEspecificos() {
    return this.http.get('http://localhost:3000/CatCursosEspecificos').toPromise();
  }

  public getCursoEspecificoById(id: string) {
    return this.http.get('http://localhost:3000/CatCursosEspecificos/?idCurso=' + id).toPromise();
  }

  public setCurrCursoEspecifio(curso: CatCapEspecifica) {
    this.currCurEspecifico = curso;
  }

  public  getCurrCursoEspecifio(): CatCapEspecifica {
    return this.currCurEspecifico;
  }
}
