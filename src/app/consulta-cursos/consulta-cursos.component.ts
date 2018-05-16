import { Component, OnInit } from '@angular/core';
import {CatAreas} from '../models/cat-areas';
import {Puestos} from '../models/puestos';
import {Employees} from '../models/employees';
import {CatCapGeneral} from '../models/cat-cap-general';
import {CatCursosEspecificosService} from '../services/cat-cursos-especificos.service';
import {CatCursosGeneralService} from '../services/cat-cursos-general.service';
import {CatAreasService} from '../services/cat-areas.service';
import {CatPuestosService} from '../services/cat-puestos.service';
import {PersonalService} from '../services/personal.service';
import {Personal} from '../models/personal';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-consulta-cursos',
  templateUrl: './consulta-cursos.component.html',
  styleUrls: ['./consulta-cursos.component.css']
})
export class ConsultaCursosComponent implements OnInit {

  criteriosForm: FormGroup;

  public tipo_curso: string;
  public currCurso: CatCapGeneral = new CatCapGeneral();
  public cursos: CatCapGeneral[] = [];
  public currAreaId: string;
  public currPuestoId: string;
  public employeesIds: number;

  public areas: CatAreas[];
  public puestos: Puestos[];
  public employees: Personal[];
  public selectedEmployees: number[];

  public fechaIni: string;
  public fechafin: string;

  public titulo = 'Consultas Cursos Generales / Especificos';

  constructor(
    private svrGeneral: CatCursosGeneralService,
    private svrEspecifico: CatCursosEspecificosService,
    private svrAreas: CatAreasService,
    private svrPuestos: CatPuestosService,
    private svrEmpleados: PersonalService,
              ) {
    this.svrAreas.getAllCatAreas().then( (a: CatAreas[]) => {
      this.areas = a;
    });
    this.svrEmpleados.getAllPersonal().then((b: Personal[]) => {
      this.employees = b;
    });
  }

  ngOnInit() {
    this.criteriosForm = new FormGroup ({
      tipo_Curso: new FormControl('', [Validators.required]),
      curso: new FormControl(0, []),
      area: new FormControl(0, []),
      puesto: new FormControl(0, []),
      empleados: new FormControl(0, []),
      fecha_ini: new FormControl('', []),
      fecha_fin: new FormControl('', []),
      });
  }

  getCursosTipo() {
    console.log('Curso: ', this.criteriosForm.controls.tipo_Curso.value);
    if (this.criteriosForm.controls.tipo_Curso.value === '1') {
      this.svrGeneral.getAllCursosCapGeneral().then (( a: any[]) => {
        this.cursos = a;
      });
    } else if (this.criteriosForm.controls.tipo_Curso.value === '2') {
      this.svrEspecifico.getAllCursosEspecificos().then( (b: any[]) => {
        this.cursos = b;
      });
    } else {
      this.cursos = [];
    }
    this.currCurso = new CatCapGeneral();
  }

  getPuestosPorArea() {
    console.log('Area: ', this.criteriosForm.controls.area.value);
    if (this.criteriosForm.controls.area.value === '0') {
      this.puestos = [];
      this.currPuestoId = '';
      this.svrEmpleados.getAllPersonal().then( (b: any[]) => {
        this.employees = b;
      });
    } else {
      this.svrPuestos.getAllPuestosByArea(this.criteriosForm.controls.area.value).then( (a: Puestos[]) => {
        this.puestos = a;
      });
      console.log('CurrArea = ', parseInt(this.criteriosForm.controls.area.value, 0));
      this.svrEmpleados.getPersonalByArea(parseInt(this.criteriosForm.controls.area.value, 0)).then ( (b: Personal[]) => {
        this.employees = b;
      });
    }
    this.selectedEmployees = [];
    this.currPuestoId = '';
  }

  getEmpleadosByPuesto() {
    console.log('Puesto: ', this.criteriosForm.controls.puesto.value);
    if (this.criteriosForm.controls.puesto.value === '0') {
      this.svrEmpleados.getPersonalByArea(parseInt(this.criteriosForm.controls.area.value, 0)).then ( (b: Personal[]) => {
        this.employees = b;
      });
    } else {
      this.svrEmpleados.getPersonalByPuesto(parseInt(this.criteriosForm.controls.puesto.value, 0)).then ( (c: Personal[]) => {
        this.employees = c;
      });
    }
    this.selectedEmployees = [];
  }

  searchdata() {
    console.log('Criterios: ', this.criteriosForm.value);
  }
}
