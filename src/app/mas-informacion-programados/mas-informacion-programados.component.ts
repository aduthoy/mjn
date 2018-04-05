import { Component, OnInit } from '@angular/core';
import {TrainingDatesService} from '../services/training-dates.service';
import {GridOptions} from 'ag-grid';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-mas-informacion-programados',
  templateUrl: './mas-informacion-programados.component.html',
  styleUrls: ['./mas-informacion-programados.component.css']
})
export class MasInformacionProgramadosComponent implements OnInit {

  public titulo = '';
  public generalGrid: GridOptions;
  public specificGrid: GridOptions;
  public pdmGrid: GridOptions;

  constructor(private svrTrainingDates: TrainingDatesService, private svrlogin: LoginService) {

    this.generalGrid = <GridOptions> {
      rowSelection: 'single',
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
    };

    this.generalGrid.columnDefs = [
      {headerName: 'Fecha', field: 'initial_date', width: 105},
      {headerName: 'Lugar', field: 'location', width: 250},
      {headerName: 'Duración', field: 'duracionCurso'},
      {headerName: 'Curso', field: 'nombre_curso', width: 250},
      {headerName: 'Tema', field: 'tema_curso', width: 410},
    ];


    this.specificGrid = <GridOptions> {
      rowSelection: 'single',
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
    };

    this.specificGrid.columnDefs = [
      {headerName: 'Fecha', field: 'initial_date', width: 105},
      {headerName: 'Lugar', field: 'location', width: 250},
      {headerName: 'Duración', field: 'duracionCurso'},
      {headerName: 'Curso', field: 'nombre_curso', width: 250},
      {headerName: 'Tema', field: 'tema_curso', width: 410},
    ];

    this.pdmGrid = <GridOptions> {
      rowSelection: 'single',
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
    };

    this.pdmGrid.columnDefs = [
      {headerName: 'Año', field: 'year', width: 90},
      {headerName: 'Qx', field: 'quarter', width: 90},
      {headerName: 'Código', field: 'cveActualpdm', width: 300},
      {headerName: 'Titulo', field: 'tituloPdm', width: 410},
      {headerName: 'Area', field: 'nombreArea', width: 130}
    ];

    this.svrTrainingDates.getProgramadosGeneralDetalleByUserId(this.svrlogin.userId).then( (a: any[]) => {
      this.generalGrid.rowData = a;
    });

    this.svrTrainingDates.getProgramadosEspecificoDetalleByUserId(this.svrlogin.userId).then( (a: any[]) => {
      this.specificGrid.rowData = a;
    });

    this.svrTrainingDates.getProgramadosPDMDetalleByUserId(this.svrlogin.userId).then( (a: any[]) => {
      this.pdmGrid.rowData = a;
    });

  }

  ngOnInit() {
    this.titulo = 'Entrenamientos Programados.';

    this.generalGrid.rowData = [];
    this.specificGrid.rowData = [];
    this.pdmGrid.rowData = [];
  }

}
