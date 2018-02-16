import { Component, OnInit } from '@angular/core';
import {RedComponentComponent} from '../red-component/red-component.component';
import { GridOptions} from 'ag-grid';
import {HttpClient} from '@angular/common/http';
import {Catpdms} from '../models/catpdms';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {
  gridOptions: GridOptions;
  catPdms: Array<Catpdms> = [];

  constructor(private httpCliente: HttpClient ) {

    this.httpCliente.get('http://localhost:3000/catpdms').subscribe(
      (data: any[]) => {
        console.log('Listado del catPDMs', data);
        this.catPdms = data;
        this.gridOptions.rowData = data;
      }
    );

    this.gridOptions = <GridOptions>{
      rowSelection: 'Single',
      enableFilter: true,
      enableSorting: true,
      enableColResize: true,
      suppressCellSelection: false,
      rowClass: 'itweb-gridrow'
    };
    /*this.gridOptions.columnDefs = [
      { headerName: 'ID', field: 'id', width: 100},
      { headerName: 'Value', field: 'value', cellRendererFramework: RedComponentComponent , width: 100}
    ];*/

    this.gridOptions.columnDefs = [
      { headerName: 'Código Actual PDM', field: 'codigoactual'},
      { headerName: 'Código Anterior PDM', field: 'codigoanterior'},
      { headerName: 'Titulo', field: 'titulo'},
      { headerName: 'Fecha Efectiva Anterior PDM', field: 'fechaefectiva'},
      { headerName: 'Status', field: 'status'},
      { headerName: 'Dueño del Documento', field: 'duenodoc'},
      { headerName: 'Proceso', field: 'proceso'},
      { headerName: 'Area', field: 'area'},
      { headerName: 'Estatus', field: 'estatus'}
    ];

    this.gridOptions.rowData = this.catPdms;
    /*this.gridOptions.rowData = [
      {id: 5 , value: 10},
      {id: 10, value: 15},
      {id: 15, value: 30},
      {id: 20, value: 90},
      {id: 25, value: 180},
      {id: 30, value: 360}
    ];*/
    console.log('Info de agGrid', this.gridOptions.columnDefs, this.gridOptions.rowData);

    /*this.usuarios = new UserServiceService();
    console.log('Usuarios en el Módulo by-grid', this.usuarios);*/
  }

  ngOnInit() {
    console.log('Ya se hizo el onInit');
  }

}
