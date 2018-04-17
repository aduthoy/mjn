import { Component, OnInit } from '@angular/core';
import {Personal} from '../models/personal';
import {CatAreasService} from '../services/cat-areas.service';
import {Employees} from '../models/employees';
import {GridOptions} from 'ag-grid';
import {CatCapGeneral} from '../models/cat-cap-general';
import {Puestos} from '../models/puestos';
import {TrainingDatesService} from '../services/training-dates.service';
import {CatCursosGeneralService} from '../services/cat-cursos-general.service';
import {CatPuestosService} from '../services/cat-puestos.service';
import {CatAreas} from '../models/cat-areas';
import {TrainingDates} from '../models/training-dates';
import {FormControl} from '@angular/forms';
import {PersonalService} from '../services/personal.service';
import {CatCursosEspecificosService} from '../services/cat-cursos-especificos.service';
import {CatCapEspecifica} from '../models/cat-cap-especifica';

@Component({
  selector: 'app-captura-calificaciones',
  templateUrl: './captura-calificaciones.component.html',
  styleUrls: ['./captura-calificaciones.component.css']
})
export class CapturaCalificacionesComponent implements OnInit {

  public tipoCurso: string;

  public cursos: CatCapGeneral[];
  public currCurso: CatCapGeneral = new CatCapGeneral();
  public currTrainingDate: TrainingDates = new TrainingDates();
  public editCurrTrainingDate: TrainingDates = new TrainingDates();
  public datesGrid: GridOptions;
  public employesGrid: GridOptions;
  public areas: CatAreas[];
  public puestos: Puestos[];
  public empleados: Personal[] = [];

  public selectedEmpleado: number;
  public selectedArea: number;
  public selectedPuesto: number;
  public empleadosReady = false;
  public rowselected = false;
  public empleados_sel: Employees[];
  public selectedpcg = false;

  private empleadosId: number[] = [];

  public searchField: FormControl;
  public listaEmp: Personal[];

  public titulo = 'Actualización de Cursos Impartidos';


  constructor(private svrCursoGen: CatCursosGeneralService,
              private svrCursoEsp: CatCursosEspecificosService,
              private svrDates: TrainingDatesService,
              private svrAreas: CatAreasService,
              private svrPuestos: CatPuestosService,
              private svrPersonal: PersonalService) {

    this.datesGrid = <GridOptions> {
      rowSelection: 'single',
      enableFilter: true,
      enableSorting: true,
    };

    this.datesGrid.columnDefs = [
      // {headerName: 'Est.', field: 'estatus', width: 70},
      {headerName: 'Qx', field: 'quarter', width: 60},
      {headerName: 'Fecha', field: 'initial_date', width: 120},
      {headerName: 'Lugar', field: 'location', width: 250}
    ];

    this.employesGrid = <GridOptions> {
      rowSelection: 'multiple',
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
    };

    this.employesGrid.columnDefs = [
      {headerName: '# Emp', field: 'idEmpleado', width: 60},
      {headerName: 'Nombre', field: 'nombreEmpleado', width: 400},
      {headerName: 'Estadus', field: 'pivot.estatus', width: 80, editable: true}
      /*{headerName: 'A. Paterno', field: 'apellidoPaterno', width: 120},
      {headerName: 'A. Materno', field: 'apellidoMaterno', width: 120},
      {headerName: 'Area', field: 'area.nombreArea', width: 150},
      {headerName: 'Puesto', field: 'puesto.nombrePuesto', width: 150},*/
    ];

    this.datesGrid.rowData = [];
    this.employesGrid.rowData = [];
    this.cursos = [];
  }

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchField.disable();

    this.searchField.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe( nom => {
        this.filterEmps (nom);
      });
  }

  public filterEmps(nombre_filtrar: string) {
    this.listaEmp = this.empleados.filter( nombre => nombre.nombre.toLocaleLowerCase().indexOf(nombre_filtrar.toLowerCase()) !== -1);
  }

  getCursosTipo() {
    if (this.tipoCurso === '1' ) {
      this.svrCursoGen.getAllCursosCapGeneral().then( ( a: CatCapGeneral[] ) => {this.cursos = a; });
      this.currCurso = new CatCapGeneral();
    } else if (this.tipoCurso === '2') {
      this.svrCursoEsp.getAllCursosEspecificos().then( (b: CatCapEspecifica[]) => {this.cursos = b; });
      this.currCurso = new CatCapEspecifica();
    } else {
      this.cursos = [];
    }
    this.datesGrid.rowData = [];
    this.employesGrid.rowData = [];
  }

  getInfoCurso() {
    if (this.tipoCurso === '1') {
      this.svrCursoGen.getCursoCapGeneralById(this.currCurso.id).then((a: CatCapGeneral) => {
        this.svrCursoGen.setCurrCursoGeneral(a);
        this.currCurso = this.svrCursoGen.getCurrCursoGeneral();
        console.log(this.currCurso);
        this.svrDates.getAllTrainingDatesByGeneralTraininigId(this.currCurso.id).then((b: TrainingDates[]) => {
          this.datesGrid.rowData = b;
          this.selectedpcg = true;
        });
      });
    } else if (this.tipoCurso === '2') {
      this.svrCursoEsp.getCursoEspecificoById(this.currCurso.id).then((a: CatCapEspecifica) => {
        this.svrCursoEsp.setCurrCursoEspecifio(a);
        this.currCurso = this.svrCursoEsp.getCurrCursoEspecifio();
        console.log(this.currCurso);
        this.svrDates.getAllTrainingDatesBySpecificTrainigId(this.currCurso.id).then((b: TrainingDates[]) => {
          this.datesGrid.rowData = b;
          this.selectedpcg = true;
        });
      });
    } else {
      this.datesGrid.rowData = [];
    }
  }

  onSeletedDatesGridRow(event: any) {
    console.log('Se selecciono una fecha ', event.api.getSelectedRows()[0]);
    this.currTrainingDate = event.api.getSelectedRows()[0];
    this.svrDates.getEmployessByTrainingDateId(this.currTrainingDate.id).then( (a: Employees[]) => {
      this.employesGrid.rowData = a;
      console.log('Info Empleados > ', a);
      this.searchField.enable();
    });
    this.rowselected = false;
  }

  onSeletedRowEmployesGrid(evento: any) {
    this.empleados_sel = evento.api.getSelectedRows();
  }

  updateEmployees() {
    console.log('Seleccionados', this.empleados_sel);
    for (let i = 0; i < this.empleados_sel.length; i++) {
      this.empleados_sel[i].pivot.estatus = 1;
    }
    console.log('Lo que se actaulizadra', this.empleados_sel);
    this.svrDates.updateStatusEmployeesByTrainingDate(this.empleados_sel, this.currTrainingDate.id).then((a: any) => {
      this.svrDates.getEmployessByTrainingDateId(this.currTrainingDate.id).then( (b: Employees[]) => {
        this.employesGrid.rowData = b;
        this.searchField.enable();
      });
      }
    );
  }
}
