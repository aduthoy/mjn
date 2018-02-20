import { Component, OnInit } from '@angular/core';
import { GridOptions} from 'ag-grid';
import { HttpClient } from '@angular/common/http';
import { Catpdms } from '../models/catpdms';
import { CatPdmService } from '../services/cat-pdm.service';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {

  /*Variables de control del Grid */

  gridApi;
  gridColumnApi;
  rowSelection;

  gridOptions: GridOptions;
  catPdms: Catpdms[];

  constructor(private catpdmservice: CatPdmService, private httpCliente: HttpClient ) {

    this.catpdmservice.getAllPdms().then((d: Catpdms[]) => {
      this.catPdms = d;
    });

    /*this.httpCliente.get('http://localhost:3000/catpdms').subscribe(
      (data: any[]) => {
        console.log('Listado del catPDMs', data);
        this.catPdms = data;
        this.gridOptions.rowData = data;
      }
    );*/

    this.gridOptions = <GridOptions>{
      rowSelection: 'single',
      enableFilter: true,
      enableSorting: true,
      enableColResize: true
    };

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

    /*this.gridOptions.rowData = [
      {id: 5 , value: 10},
      {id: 10, value: 15},
      {id: 15, value: 30},
      {id: 20, value: 90},
      {id: 25, value: 180},
      {id: 30, value: 360}
    ];*/

    /*this.usuarios = new UserServiceService();
    console.log('Usuarios en el Módulo by-grid', this.usuarios);*/
  }

  public onselect(event: any) {
    console.log('Seleccion:', this.rowSelection, ' ', event);
  }

  public onSelectionChange(event: any) {
    console.log('Se cambio la selecciono de un renglon');
  }

  public onGridReady(event: any) {
    console.log('Grid Listo para Pintar');
    this.gridOptions.rowData = this.catPdms;
  }

  public onSeletedRow(event: any) {
  }

  public editReg(event) {
    let catpdm: Catpdms = event.data;
  }
  ngOnInit() {
  }

}
