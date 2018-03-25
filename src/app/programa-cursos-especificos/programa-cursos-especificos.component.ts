import { Component, OnInit } from '@angular/core';
import {CatCapGeneral} from '../models/cat-cap-general';
import {Puestos} from '../models/puestos';
import {Personal} from '../models/personal';
import {Employees} from '../models/employees';
import {GridOptions} from 'ag-grid';
import {CatAreas} from '../models/cat-areas';
import {TrainingDates} from '../models/training-dates';
import {CatAreasService} from '../services/cat-areas.service';
import {TrainingDatesService} from '../services/training-dates.service';
import {CatPuestosService} from '../services/cat-puestos.service';
import {PersonalService} from '../services/personal.service';
import {CatCursosEspecificosService} from '../services/cat-cursos-especificos.service';
import {CatCapEspecifica} from '../models/cat-cap-especifica';

@Component({
  selector: 'app-programa-cursos-especificos',
  templateUrl: './programa-cursos-especificos.component.html',
  styleUrls: ['./programa-cursos-especificos.component.css']
})
export class ProgramaCursosEspecificosComponent implements OnInit {

  public cursos: CatCapEspecifica[];
  public currCurso: CatCapEspecifica;
  public currTrainingDate: TrainingDates = new TrainingDates();
  public datesGrid: GridOptions;
  public employesGrid: GridOptions;
  public areas: CatAreas[];
  public puestos: Puestos[];
  public empleados: Personal[];

  public selectedEmpleado: number;
  public selectedArea: number;
  public selectedPuesto: number;
  public empleadosReady = false;
  public rowselected = false;
  public empleados_sel: Employees[];

  private empleadosId: number[] = [];

  public titulo = 'Programación de Cursos Especificos';

  constructor(private svrCurso: CatCursosEspecificosService, private svrDates: TrainingDatesService,
              private svrAreas: CatAreasService, private svrPuestos: CatPuestosService,
              private svrPersonal: PersonalService) {

    this.currCurso = new CatCapGeneral();
    this.svrCurso.getAllCursosEspecificos().then( ( a: CatCapGeneral[] ) => {this.cursos = a; });
    this.svrAreas.getAllCatAreas().then( (a: CatAreas[]) => { this.areas = a; });

    this.datesGrid = <GridOptions> {
      rowSelection: 'single',
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
    };

    this.datesGrid.columnDefs = [
      {headerName: 'Est.', field: 'estatus', width: 70},
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
      {headerName: 'Nombre', field: 'nombreEmpleado', width: 200},
      {headerName: 'A. Paterno', field: 'apellidoPaterno', width: 120},
      {headerName: 'A. Materno', field: 'apellidoMaterno', width: 120},
      {headerName: 'Area', field: 'area.nombreArea', width: 150},
      {headerName: 'Puesto', field: 'puesto.nombrePuesto', width: 150},
    ];

    this.datesGrid.rowData = null;
    this.employesGrid.rowData = null;
  }

  ngOnInit() {
  }

  onDatesGridReady(evento: any) {
    this.datesGrid.rowData = [];
  }

  onEmployeesGridReady(evento: any) {
    this.employesGrid.rowData = [];
  }

  public getInfoCurso() {
    this.svrCurso.getCursoEspecificoById(this.currCurso.id).then( (a: CatCapGeneral) => {
      this.svrCurso.setCurrCursoEspecifio(a);
      this.currCurso = this.svrCurso.getCurrCursoEspecifio();
      console.log(this.currCurso);
      this.svrDates.getAllTrainingDatesBySpecificTrainigId(this.currCurso.id).then( (b: TrainingDates[]) => {
        console.log('Fechas de Entrenamiento ', b);
        this.datesGrid.rowData = b;
      });
    });
  }

  public onSelectEvent(evento: any) {
    console.log(evento);
  }

  public addDate() {
    if (this.currCurso === null || this.currCurso === undefined) {
      // TODO: mostrar dialogo que tiene que seleccionar un curos y que esté activo
    } else {
      this.currTrainingDate.specific_training_id = this.currCurso.id;
      console.log('Grabando la fecha con la siguiente info: ', this.currTrainingDate);
      this.svrDates.postTrainingDate(this.currTrainingDate).then( (a: any) => {
        this.svrDates.getAllTrainingDatesBySpecificTrainigId(this.currCurso.id).then((b: TrainingDates[]) => {
          this.datesGrid.rowData = b;
        });
      });
    }
    this.currTrainingDate = new TrainingDates();
  }

  public deleteDate() {

  }

  public onSeletedDatesGridRow(event: any) {
    this.currTrainingDate = event.api.getSelectedRows()[0];
    this.svrDates.getEmployessByTrainingDateId(this.currTrainingDate.id).then( (a: Employees[]) => {
      this.employesGrid.rowData = a;
      console.log('Info Empleados > ', a);
    });
    this.rowselected = false;
  }
  public onSeletedRowEmployesGrid(evento: any) {
    this.empleados_sel = evento.api.getSelectedRows();
    if (this.empleados_sel.length > 0) {
      this.rowselected = true;
    } else {
      this.rowselected = false;
    }
    console.log(this.empleados_sel, this.empleados_sel.length);
  }

  public areaChange() {
    console.log('Selected Area =', this.selectedArea);
    if (this.selectedArea > 0 ) {
      this.svrPuestos.getAllPuestosByArea(this.selectedArea).then( (a: Puestos[]) => {this.puestos = a; });
      console.log('Pustos ', this.puestos);
      this.svrPersonal.getPersonalByArea(this.selectedArea).then((b: Personal[]) => {
        this.empleados = b;
        if (this.empleados.length > 0) {
          this.empleadosReady = true;
        } else {
          this.empleadosReady = false;
        }
      });
      console.log('Empleados del area ', this.empleados);
    } else {

      this.svrPuestos.getAllPuestos().then( (a: Puestos[]) => { this.puestos = a; });
      this.svrPersonal.getAllPersonal().then( (b: Personal[]) => {
        this.empleados = b;
        console.log('Validando la cantidad de Empleados: ', this.empleados.length);
        if (this.empleados.length > 0) {
          this.empleadosReady = true;
        } else {
          this.empleadosReady = false;
        }
      });
    }
  }

  public puestoChange() {
    console.log('Selected Puesto = ', this.selectedPuesto);
    if (this.selectedPuesto > 0) {
      this.svrPersonal.getPersonalByPuesto(this.selectedPuesto).then((a: Personal[]) => {
        this.empleados = a;
        if (this.empleados.length > 0) {
          this.empleadosReady = true;
        } else {
          this.empleadosReady = false;
        }
      });
    } else if (this.selectedArea > 0) {
      this.svrPersonal.getPersonalByArea(this.selectedArea).then( (a: Personal []) => {
        this.empleados = a;
        if (this.empleados.length > 0) {
          this.empleadosReady = true;
        } else {
          this.empleadosReady = false;
        }
      });
    } else {
      this.svrPersonal.getAllPersonal().then( (a: Personal[]) => {
        this.empleados = a;
        if (this.empleados.length > 0) {
          this.empleadosReady = true;
        } else {
          this.empleadosReady = false;
        }
      });
    }
  }

  public AddEmployee() {
    console.log(this.selectedArea, this.selectedPuesto, this.selectedEmpleado, this.empleados.length);
    for (let i = 0; i < this.empleados.length; i++) {
      this.empleadosId.push(this.empleados[i].id);
    }
    console.log('Arreglo de Empleados = ', this.empleados);
    console.log('SelectedEmpleadoId =', this.selectedEmpleado);
    if (this.selectedEmpleado === undefined || this.selectedEmpleado <= 0) {
      console.log('Deberan agregarse todos los empleados del combo');
      this.svrDates.addEmployees(this.empleados, this.currTrainingDate.id).then( (a: any) => {
        console.log('Employees attached', a);
        this.svrDates.getEmployessByTrainingDateId(this.currTrainingDate.id).then( (b: Employees[]) => {
          this.employesGrid.rowData = b;
        });
      });
    } else {
      const empleado = this.empleados.find( ( empleado: Personal) => empleado.id === this.selectedEmpleado);
      console.log('Agregar solo el empleado seleccionado ', empleado);
      this.svrDates.addOneEmployee(empleado, this.currTrainingDate.id).then( (a: any) => {
        console.log('Employees attached', a);
        this.svrDates.getEmployessByTrainingDateId(this.currTrainingDate.id).then( (b: Employees[]) => {
          this.employesGrid.rowData = b;
        });
      });
    }
    this.selectedEmpleado = 0;
  }

  public DelEmployee() {
    if (this.empleados_sel.length > 1) {
      console.log('Detach Employees');
      this.svrDates.delEmployees(this.empleados_sel, this.currTrainingDate.id).then( (a: any) => {
        this.svrDates.getEmployessByTrainingDateId(this.currTrainingDate.id).then( (b: Employees[]) => {
          this.employesGrid.rowData = b;
        });
      });
    } else {
      console.log('Detach Employee');
      this.svrDates.delEmployee(this.empleados_sel[0], this.currTrainingDate.id).then((a: any) => {
        this.svrDates.getEmployessByTrainingDateId(this.currTrainingDate.id).then( (b: Employees[]) => {
          this.employesGrid.rowData = b;
        });
      });
    }
    this.empleados_sel = null;
    this.rowselected = false;
  }
}
