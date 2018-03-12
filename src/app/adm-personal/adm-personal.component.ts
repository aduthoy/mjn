import { Component, OnInit } from '@angular/core';
import {GridOptions} from 'ag-grid';
import {PersonalService} from '../services/personal.service';
import {Personal} from '../models/personal';
import {MatDialog} from '@angular/material';
import {AbcPersonalComponent} from './abc-personal.component';
import {Puestos} from '../models/puestos';
import {CatAreas} from '../models/cat-areas';
import {DialogmessageComponent} from '../dialogmessage/dialogmessage.component';

@Component({
  selector: 'app-adm-personal',
  templateUrl: './adm-personal.component.html',
  styleUrls: ['./adm-personal.component.css']
})
export class AdmPersonalComponent implements OnInit {

  personalgridOptions: GridOptions;
  currEmpleado;

  constructor(private personalsvr: PersonalService, private dialog: MatDialog) {

    this.personalgridOptions = <GridOptions>{
      rowSelection: 'single',
      enableFilter: true,
      enableSorting: true,
      enableColResize: true
    };

    this.personalgridOptions.columnDefs = [
      {headerName: 'Id. Empelado', field: 'idEmpleado'},
      {headerName: 'Nombre Empleado', field: 'nombreEmpleado'},
      {headerName: 'A. Paterno', field: 'apellidoPaterno'},
      {headerName: 'A. Materno', field: 'apellidoMaterno'},
      {headerName: 'Area', field: 'areaEmpleado.nombreArea'},
      {headerName: 'Puesto', field: 'puestoEmpleado.puestoNombre'}
    ];
  }

  ngOnInit() {
  }

  onGridReady(evento: any) {
    this.personalsvr.getAllPersonal().then((a: Personal[]) => { this.personalgridOptions.rowData = a; });
  }

  onSeletedRow(evento: any) {
    this.currEmpleado = evento.api.getSelectedRows()[0];
    console.log('Emepleado Seleccionado: ', this.currEmpleado);
  }

  onClickNewButton() {
    this.currEmpleado = new Personal();
    this.currEmpleado.areaEmpleado = new CatAreas();
    this.currEmpleado.puestoEmpleado = new Puestos();
    this.personalsvr.setCurrEmpleado(this.currEmpleado);
    this.dialog.open(AbcPersonalComponent, {data: {accion: 'Alta de Personal'}});
    this.personalsvr.getAllPersonal().then( (a: Personal[]) => { this.personalgridOptions.rowData = a; });
    console.log('Refresh Grid');
    const params = { force : true };
    this.personalgridOptions.api.refreshCells(params);
  }

  onClickEditButton() {
    if (this.currEmpleado === null || this.currEmpleado === undefined) {
      this.dialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el empleado a editar', icono: 1}});
    } else {
      this.personalsvr.setCurrEmpleado(this.currEmpleado);
      this.dialog.open(AbcPersonalComponent, {data: {accion: 'Editando Personal'}});
    }
  }
}
