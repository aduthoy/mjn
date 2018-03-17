import { Component, OnInit } from '@angular/core';
import {GridOptions} from 'ag-grid';
import {PersonalService} from '../services/personal.service';
import {Personal} from '../models/personal';
import {MatDialog} from '@angular/material';
import {AbcPersonalComponent} from './abc-personal.component';
import {DialogmessageComponent} from '../dialogmessage/dialogmessage.component';

@Component({
  selector: 'app-adm-personal',
  templateUrl: './adm-personal.component.html',
  styleUrls: ['./adm-personal.component.css']
})
export class AdmPersonalComponent implements OnInit {

  personalgridOptions: GridOptions;
  currEmpleado;

  constructor(private personalsvr: PersonalService, private dialog: MatDialog, public msgDialog: MatDialog) {

    this.personalgridOptions = <GridOptions>{
      rowSelection: 'single',
      enableFilter: true,
      enableSorting: true,
      enableColResize: true
    };

    this.personalgridOptions.columnDefs = [
      {headerName: 'Estado', field: 'activo', width: 100},
      {headerName: 'Id. Empelado', field: 'idEmpleado'},
      {headerName: 'Nombre Empleado', field: 'nombreEmpleado'},
      {headerName: 'A. Paterno', field: 'apellidoPaterno'},
      {headerName: 'A. Materno', field: 'apellidoMaterno'},
      {headerName: 'Area', field: 'nombreArea'},
      {headerName: 'Puesto', field: 'nombrePuesto'}
    ];

    this.dialog.afterAllClosed.subscribe((b: any) => {
      this.personalsvr.getAllPersonal().then((d: Personal[]) => {
        this.personalgridOptions.rowData = d;
      });
    });
  }

  ngOnInit() {
  }

  onGridReady(evento: any) {}

  onSeletedRow(evento: any) {
    this.currEmpleado = evento.api.getSelectedRows()[0];
    console.log('Emepleado Seleccionado: ', this.currEmpleado);
  }

  onClickNewButton() {
    this.currEmpleado = new Personal();
    /*this.currEmpleado.areaEmpleado = new CaAreas();
    this.currEmpleado.puestoEmpleado = new Puestos();*/
    this.personalsvr.setCurrEmpleado(this.currEmpleado);
    this.dialog.open(AbcPersonalComponent, {data: {accion: 'Alta de Personal'}});
  }

  onClickEditButton() {
    if (this.currEmpleado === null || this.currEmpleado === undefined) {
      this.dialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el empleado a editar', icono: 1}});
    } else {
      this.personalsvr.setCurrEmpleado(this.currEmpleado);
      this.dialog.open(AbcPersonalComponent, {data: {accion: 'Editando Personal'}});
    }
  }

  onClickDeleteButton() {
    if (this.currEmpleado === null || this.currEmpleado === undefined) {
      this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el empleado a eliminar, por favor.',
          icono: 1, dialogtype: 1}});
    } else {
      const dialogref = this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seguro de eliminar el Empleado ' +
          this.currEmpleado.nombreEmpleado + ' ' + this.currEmpleado.apellidoPaterno + ' ' + this.currEmpleado.apellidoMaterno,
          icono: 3, dialogtype: 2}});
      dialogref.afterClosed().subscribe( (respuesta: number) => {
        if (respuesta !== undefined) {
          console.log('Hay que borrar');
          this.personalsvr.deletePersonal(this.currEmpleado).then( d => {
            this.personalsvr.getAllPersonal().then((e: Personal[]) => {
              this.personalgridOptions.rowData = e;
              console.log('Actualizando Empleados');
            });
            this.currEmpleado = null;
          });
        } else {
          console.log('Se arrepintio');
          this.currEmpleado = null;
        }
      });
    }
  }
}
