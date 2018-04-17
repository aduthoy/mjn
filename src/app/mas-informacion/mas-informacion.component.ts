import { Component, OnInit } from '@angular/core';
import {GridOptions} from 'ag-grid';
import {TrainingDatesService} from '../services/training-dates.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-mas-informacion',
  templateUrl: './mas-informacion.component.html',
  styleUrls: ['./mas-informacion.component.css']
})
export class MasInformacionComponent implements OnInit {

  public titulo = '';
  public generalGrid: GridOptions;
  public specificGrid: GridOptions;
  public pdmGrid: GridOptions;

  constructor(private svrTrainingDates: TrainingDatesService, private svrlogin: LoginService) {

    const vencido = 99;
    const porvencer = 80;
    const ok = 0;

    this.generalGrid = <GridOptions> {
      rowSelection: 'single',
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
    };

    this.generalGrid.columnDefs = [
      {headerName: '', field: 'estatus', width: 20 ,
        cellClassRules:
          {
            'celVencido' : function (params) {
              return vencido === params.value;
            },
            'celPorVencer' : function (params) {
              return porvencer === params.value;
            },
            'celOK' : function (params) {
              return ok === params.value;
            }
          }},
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

    this.svrTrainingDates.getProximosaVencerGeneralDetalleByUserId(this.svrlogin.currUser.employeeId).then( (a: any[]) => {
      this.generalGrid.rowData = a;
    });

    this.svrTrainingDates.getProximosaVencerEspecificoDetalleByUserId(this.svrlogin.currUser.employeeId).then( (a: any[]) => {
      this.specificGrid.rowData = a;
    });

    this.svrTrainingDates.getProximosaVencerPDMDetalleByUserId(this.svrlogin.currUser.employeeId).then( (a: any[]) => {
      this.pdmGrid.rowData = a;
    });

  }

  ngOnInit() {
    this.titulo = 'Entrenamientos a vencer en 90 días naturales.';

    this.generalGrid.rowData = [];
    this.specificGrid.rowData = [];
    this.pdmGrid.rowData = [];
  }

  generalGridReady(evento: any) {
    console.log(evento);
  }

}
