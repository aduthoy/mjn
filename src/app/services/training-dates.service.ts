import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TrainingDates} from '../models/training-dates';
import {Employees} from '../models/employees';
import {Personal} from '../models/personal';

@Injectable()
export class TrainingDatesService {
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  private currTrainingDate: TrainingDates;

  constructor(private http: HttpClient) {
  }

  public setCurrTrainingDate(training: TrainingDates) {
    this.currTrainingDate = training;
  }

  public getCurrTrainigDate() {
    return this.currTrainingDate;
  }

  public getAllTrainingDates() {
    return this.http.get('http://localhost:8000/api/trainingdate').toPromise();
  }


  public getTrainingDateById(id: string) {
    return this.http.get('http://localhost:8000/api/trainingdate/' + id).toPromise();
  }

  public postTrainingDate(training: TrainingDates) {
    return this.http.post('http://localhost:8000/api/trainingdate', JSON.stringify(training),
      {headers: this.headers}).toPromise();
  }

  public putTrainidDate(training: TrainingDates) {
    return this.http.put('http://localhost:8000/api/trainingdate/' + training.id, JSON.stringify(training),
      {headers: this.headers}).toPromise();
  }

  public deleteTrainingDate(training: TrainingDates) {
    return this.http.delete('http://localhost:8000/api/trainingdate/' + training.id, {headers: this.headers}).toPromise();
  }

  public getAllTrainingDatesByGeneralTraininigId (id: number) {
    return this.http.get('http://localhost:8000/api/generaltrainings/' + id + '/trainingdate').toPromise();
  }

  public  getEmployessByTrainingDateId(id: number) {
    return this.http.get('http://localhost:8000/api/trainingdates/' + id + '/personal').toPromise();
  }

  public addEmployees(employees: Personal[], id: number) {
    return this.http.put('http://localhost:8000/api/trainingdates/employees/' + id, JSON.stringify(employees),
      {headers: this.headers}).toPromise();
  }

  public addOneEmployee(employee: Personal, id: number) {
    return this.http.put('http://localhost:8000/api/trainingdates/employee/' + id, JSON.stringify(employee),
      {headers: this.headers}).toPromise();
  }

  public delEmployees(employees: Employees[], id: number) {
    return this.http.put('http://localhost:8000/api/trainingdates/delemployees/' + id, JSON.stringify(employees),
      {headers: this.headers}).toPromise();
  }

  public delEmployee(employee: Employees, id: number) {
    return this.http.put('http://localhost:8000/api/trainingdates/delemployee/' + id, JSON.stringify(employee),
      {headers: this.headers}).toPromise();
  }

  /******************************
   * Metodos para cursos Especificos
   */

  public getAllTrainingDatesBySpecificTrainigId (id: number) {
    return this.http.get('http://localhost:8000/api/specifictrainings/' + id + '/trainingdate').toPromise();
  }

  /*********************************
   * Metodos para PDMS
   */

  public getAllTrainingDatesByPdmId(id: number) {
    return this.http.get('http://localhost:8000/api/pdms/' + id + '/trainingdate').toPromise();
  }

}
