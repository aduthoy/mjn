import { Component, OnInit } from '@angular/core';
import {PersonalService} from '../services/personal.service';
import {Puestos} from '../models/puestos';
import {TrainingDates} from '../models/training-dates';
import {FormControl} from '@angular/forms';
import {CatCapGeneral} from '../models/cat-cap-general';
import {CatPuestosService} from '../services/cat-puestos.service';
import {GridOptions} from 'ag-grid';
import {CatCursosGeneralService} from '../services/cat-cursos-general.service';
import {CatAreasService} from '../services/cat-areas.service';
import {Personal} from '../models/personal';
import {Employees} from '../models/employees';
import {CatCapEspecifica} from '../models/cat-cap-especifica';
import {CatCursosEspecificosService} from '../services/cat-cursos-especificos.service';
import {TrainingDatesService} from '../services/training-dates.service';
import {CatAreas} from '../models/cat-areas';
import {Catpdms} from '../models/catpdms';
import {CatPdmService} from '../services/cat-pdm.service';

@Component({
  selector: 'app-acredita-procedimientos',
  templateUrl: './acredita-procedimientos.component.html',
  styleUrls: ['./acredita-procedimientos.component.css']
})
export class AcreditaProcedimientosComponent implements OnInit {

  public tipoCurso: string;

  public cursos: Catpdms[];
  public currCurso: Catpdms;
  public areas_pdm: CatAreas[];

  public currTrainingDate: TrainingDates = new TrainingDates();
  public editCurrTrainingDate: TrainingDates = new TrainingDates();
  public datesGrid: GridOptions;
  public employesGrid: GridOptions;
  public areas: CatAreas[];
  public puestos: Puestos[];
  public empleados: Personal[] = [];

  public currarea_pdm: number;
  public selectedEmpleado: number;
  public selectedArea: number;
  public selectedPuesto: number;
  public empleadosReady = false;
  public rowselected = false;
  public empleados_sel: Employees[];
  public selectedpcg = false;
  public selectedPdm = false;

  private empleadosId: number[] = [];

  public searchField: FormControl;
  public listaEmp: Personal[];

  public titulo = 'Actualización de Cursos Impartidos';


  constructor(
              private svrCurso: CatPdmService,
              private svrDates: TrainingDatesService,
              private svrAreas: CatAreasService,
              private svrPuestos: CatPuestosService,
              private svrPersonal: PersonalService) {

    this.currCurso = new Catpdms();
    this.svrAreas.getAllCatAreas().then( (a: CatAreas[]) => {
      this.areas = a;
      this.areas_pdm = a;
    });

    this.datesGrid = <GridOptions> {
      rowSelection: 'single',
      enableFilter: true,
      enableSorting: true,
      enableColResize: true,
    };

    this.datesGrid.columnDefs = [
      // {headerName: 'Est.', field: 'estatus', width: 70},
      {headerName: 'Año', field: 'year', width: 60},
      {headerName: 'Qx', field: 'quarter', width: 60},
      // {headerName: 'Fecha', field: 'initial_date', width: 120},
    ];

    this.employesGrid = <GridOptions> {
      rowSelection: 'multiple',
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
    };

    this.employesGrid.columnDefs = [
      {headerName: '# Emp', field: 'idEmpleado', width: 60},
      {headerName: 'Nombre', field: 'nombre', width: 400},
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

  public getCursosByArea() {
    this.svrCurso.getAllPdmsByArea(this.currarea_pdm).then((a: Catpdms[]) => {
      this.cursos = a;
      this.selectedPdm = false;
      this.datesGrid.rowData = [];
      this.employesGrid.rowData = [];
      this.currCurso = new Catpdms();
    });
  }

  getInfoCurso() {
    console.log('Buscando el PDM = ', this.currCurso.id);
    this.svrCurso.getPdmById(this.currCurso.id).then( (a: Catpdms) => {
      console.log('El curso encontrado es: ', a);
      this.svrCurso.setcurrPDM(a);
      this.currCurso = this.svrCurso.getcurrPDM();
      console.log(this.currCurso);
      this.selectedPdm = true;
      this.svrDates.getAllTrainingDatesByPdmId(this.currCurso.id).then( (b: TrainingDates[]) => {
        console.log('Fechas de Entrenamiento ', b);
        this.datesGrid.rowData = b;
      });
    });
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

