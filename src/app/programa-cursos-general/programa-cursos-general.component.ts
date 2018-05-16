import { Component, OnInit } from '@angular/core';
import {CatCursosGeneralService} from '../services/cat-cursos-general.service';
import {CatCapGeneral} from '../models/cat-cap-general';
import {TrainingDates} from '../models/training-dates';
import {TrainingDatesService} from '../services/training-dates.service';
import {GridOptions} from 'ag-grid';
import {CatAreasService} from '../services/cat-areas.service';
import {CatPuestosService} from '../services/cat-puestos.service';
import {PersonalService} from '../services/personal.service';
import {CatAreas} from '../models/cat-areas';
import {Puestos} from '../models/puestos';
import {Personal} from '../models/personal';
import {Employees} from '../models/employees';
import {FormControl} from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'app-programa-cursos-general',
  templateUrl: './programa-cursos-general.component.html',
  styleUrls: ['./programa-cursos-general.component.css']
})
export class ProgramaCursosGeneralComponent implements OnInit {

  public cursos: CatCapGeneral[];
  public currCurso: CatCapGeneral;
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

  public titulo = 'Programación de Cursos en General';


  constructor(private svrCurso: CatCursosGeneralService, private svrDates: TrainingDatesService,
              private svrAreas: CatAreasService, private svrPuestos: CatPuestosService,
              private svrPersonal: PersonalService) {

    this.currCurso = new CatCapGeneral();
    // this.svrCurso.getAllActiveGeneralTraining().then( ( a: CatCapGeneral[] ) => {this.cursos = a; });
    this.svrCurso.getAllCursosCapGeneral().then( ( a: CatCapGeneral[] ) => {this.cursos = a; });
    this.svrAreas.getAllCatAreas().then( (a: CatAreas[]) => { this.areas = a; });

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

  onDatesGridReady(evento: any) {
    this.datesGrid.rowData = [];
  }

  onEmployeesGridReady(evento: any) {
    this.employesGrid.rowData = [];
  }

  public getInfoCurso() {
    this.svrCurso.getCursoCapGeneralById(this.currCurso.id).then( (a: CatCapGeneral) => {
      this.svrCurso.setCurrCursoGeneral(a);
      this.currCurso = this.svrCurso.getCurrCursoGeneral();
      console.log(this.currCurso);
      if (this.currCurso.estatus_curso) {
        this.selectedpcg = true;
      } else {
        this.selectedpcg = false;
        this.searchField.disable();
      }
      console.log('Curso: ', this.currCurso);
      console.log('Estatus Curso: ', this.selectedpcg);
      this.svrDates.getAllTrainingDatesByGeneralTraininigId(this.currCurso.id).then( (b: TrainingDates[]) => {
        this.datesGrid.rowData = b;
      });
      this.employesGrid.rowData = [];
    });
  }

  public onSelectEvent(evento: any) {
    console.log(evento);
  }

  public addDate() {
    if (this.currCurso === null || this.currCurso === undefined) {
      // TODO: mostrar dialogo que tiene que seleccionar un curos y que esté activo
    } else {
      this.editCurrTrainingDate.general_training_id = this.currCurso.id;
      console.log('Grabando la fecha con la siguiente info: ', this.editCurrTrainingDate);
      this.svrDates.postTrainingDate(this.editCurrTrainingDate).then( (a: any) => {
        console.log('Curso Modificado ', a);
        this.svrDates.getAllTrainingDatesByGeneralTraininigId(this.currCurso.id).then((b: TrainingDates[]) => {
          this.datesGrid.rowData = b;
        });
      });
    }
    this.editCurrTrainingDate = new TrainingDates();
    console.log('info de EditCurrTrainingDate ', this.editCurrTrainingDate);
  }

  public editDate() {
    this.editCurrTrainingDate = this.currTrainingDate;
  }

  public deleteDate() {

  }

  public onSeletedDatesGridRow(event: any) {
    console.log('Se selecciono una fecha ', event.api.getSelectedRows()[0]);
    this.currTrainingDate = event.api.getSelectedRows()[0];
    this.searchField.disable();
    this.svrDates.getEmployessByTrainingDateId(this.currTrainingDate.id).then( (a: Employees[]) => {
      this.employesGrid.rowData = a;
      console.log('Info Empleados > ', a);
      if (this.selectedpcg === true) {
        this.searchField.enable();
      } else {
        this.searchField.disable();
      }
    });
    this.rowselected = false;
  }


  public onChangeSelectedDatesGridRow(event: any) {
    const lastTrainingDate = event.api.getSelectedRows()[0];
    console.log('Date Anterior ', lastTrainingDate);
    console.log('Curr Date ', this.currTrainingDate);
    this.editCurrTrainingDate = new TrainingDates();
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
    this.searchField.setValue('');
    if (this.selectedArea > 0 ) {
      this.svrPuestos.getAllPuestosByArea(this.selectedArea).then( (a: Puestos[]) => {this.puestos = a; });
      console.log('Pustos ', this.puestos);
      this.svrPersonal.getPersonalByArea(this.selectedArea).then((b: Personal[]) => {
        this.empleados = b;
        this.listaEmp = b;
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
        this.listaEmp = b;
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
    this.searchField.setValue('');
    if (this.selectedPuesto > 0) {
      this.svrPersonal.getPersonalByPuesto(this.selectedPuesto).then((a: Personal[]) => {
        this.empleados = a;
        this.listaEmp = a;
        if (this.empleados.length > 0) {
          this.empleadosReady = true;
        } else {
          this.empleadosReady = false;
        }
      });
    } else if (this.selectedArea > 0) {
      this.svrPersonal.getPersonalByArea(this.selectedArea).then( (a: Personal []) => {
        this.empleados = a;
        this.listaEmp = a;
        if (this.empleados.length > 0) {
          this.empleadosReady = true;
        } else {
          this.empleadosReady = false;
        }
      });
    } else {
      this.svrPersonal.getAllPersonal().then( (a: Personal[]) => {
        this.empleados = a;
        this.listaEmp = a;
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
    this.searchField.setValue('');
    /*for (let i = 0; i < this.empleados.length; i++) {
      this.empleadosId.push(this.empleados[i].id);
    }*/

    if (this.listaEmp.length === 0) {
      alert('Ningun empleado seleccionado');
    } else {
      if (this.listaEmp.length > 1) {
        console.log('aggregar varios empleados');
        this.svrDates.addEmployees(this.listaEmp, this.currTrainingDate.id).then( (a: any) => {
          console.log('Employees attached', a);
          this.svrDates.getEmployessByTrainingDateId(this.currTrainingDate.id).then( (b: Employees[]) => {
            this.employesGrid.rowData = b;
          });
        });
      } else {
        console.log('Agregar el empleado id = ', this.listaEmp[0].id);
        const empleado = this.listaEmp[0];
        console.log('Agregar solo el empleado seleccionado ', empleado);
        this.svrDates.addOneEmployee(empleado, this.currTrainingDate.id).then( (a: any) => {
          console.log('Employees attached', a);
          this.svrDates.getEmployessByTrainingDateId(this.currTrainingDate.id).then( (b: Employees[]) => {
            this.employesGrid.rowData = b;
          });
        });
      }
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
