import { Component, OnInit } from '@angular/core';
import {TrainingDatesService} from '../services/training-dates.service';
import {GridOptions} from 'ag-grid';

@Component({
  selector: 'app-mas-informacion-cursados',
  templateUrl: './mas-informacion-cursados.component.html',
  styleUrls: ['./mas-informacion-cursados.component.css']
})
export class MasInformacionCursadosComponent implements OnInit {

  public titulo = '';
  public generalGrid: GridOptions;
  public specificGrid: GridOptions;
  public pdmGrid: GridOptions;

  constructor(private svrTrainingDates: TrainingDatesService) {

    this.generalGrid = <GridOptions> {
      rowSelection: 'single',
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
    };

    this.generalGrid.columnDefs = [
      {headerName: 'Fecha', field: 'initial_date', width: 105},
      {headerName: 'Lugar', field: 'location', width: 250},
      {headerName: 'Cal.', field: 'calificacion', width: 90},
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
      {headerName: 'Cal.', field: 'calificacion', width: 90},
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
      {headerName: 'Cal.', field: 'calificacion', width: 90},
      {headerName: 'Código', field: 'cveActualpdm', width: 300},
      {headerName: 'Titulo', field: 'tituloPdm', width: 410},
      {headerName: 'Area', field: 'nombreArea', width: 130}
    ];

    this.svrTrainingDates.getCursadosGeneralDetalleByUserId(1).then( (a: any[]) => {
      this.generalGrid.rowData = a;
    });

    this.svrTrainingDates.getCursadosEspecificoDetalleByUserId(1).then( (a: any[]) => {
      this.specificGrid.rowData = a;
    });

    this.svrTrainingDates.getCursadosPDMDetalleByUserId(1).then( (a: any[]) => {
      this.pdmGrid.rowData = a;
    });

  }

  ngOnInit() {
    this.titulo = 'Entrenamientos Cursados.';

    this.generalGrid.rowData = [];
    this.specificGrid.rowData = [];
    this.pdmGrid.rowData = [];
  }
}
