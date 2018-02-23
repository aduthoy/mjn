import { Component, OnInit } from '@angular/core';
import {CatAreas} from '../models/cat-areas';
import {CatAreasService} from '../services/cat-areas.service';
import {CatPuestosService} from '../services/cat-puestos.service';
import {Puestos} from '../models/puestos';
import {GridApi, GridOptions} from 'ag-grid';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {AbcareasComponent} from './abcareas.component';
import {DialogmessageComponent} from '../dialogmessage/dialogmessage.component';
import {AbcPuestosComponent} from './abc-puestos.component';

@Component({
  selector: 'app-cat-areas-puestos',
  templateUrl: './cat-areas-puestos.component.html',
  styleUrls: ['./cat-areas-puestos.component.css']
})
export class CatAreasPuestosComponent implements OnInit {

  public areas: CatAreas[];
  public currarea: CatAreas;
  public puestos: Puestos[];
  public currpuesto: Puestos;

  gridPustosApi: GridApi;
  gridAreas: GridOptions;
  gridPuesto: GridOptions;

  constructor(private catareasservice: CatAreasService, private catpuestos: CatPuestosService, private dialog: MatDialog) {
    this.catareasservice.getAllCatAreas().then((a: CatAreas[]) => { this.areas = a; });

    this.gridAreas = <GridOptions> {
      rowSelection: 'single'
    }

    this.gridPuesto = <GridOptions> {
      rowSelection: 'single'
    }

    this.gridAreas.columnDefs = [
      {headerName: 'Cve. Area', field: 'idArea', width: 100},
      {headerName: 'Area', field: 'nombreArea'}
    ];

    this.gridPuesto.columnDefs = [
      {headerName: 'Cve Puesto', field: 'puestoId', width: 150},
      {headerName: 'Desc. Puesto', field: 'puestoNombre'}
    ];
  }

  ngOnInit() {
  }

  onSeletedAreasRow(evento: any) {
    this.currarea = evento.api.getSelectedRows()[0];
    console.log('ID del Area: ', this.currarea.idArea );
    this.catpuestos.getAllPuestosByArea(this.currarea.idArea).then((a: Puestos[]) => this.gridPuesto.rowData = a);
  }

  onSeletedPuestosRow(evento: any) {
    this.currpuesto = evento.api.getSelectedRows()[0];
  }

  onGridAreasReady() {
    this.gridAreas.rowData = this.areas;
  }

  showAltaDialog() {
    this.catareasservice.setCurrArea(new CatAreas());
    this.dialog.open(AbcareasComponent, { width: '550px', data: {accion: 'Nueva Area'}});
  }

  showEditDialog() {
    console.log(this.currarea);
    if (this.currarea === null || this.currarea === undefined) {
      this.dialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione una área por favor.', icono: 1}});
    } else {
      this.catareasservice.setCurrArea(this.currarea);
      this.dialog.open(AbcareasComponent, {width: '550px', data: {accion: 'Editar Area'}});
    }
  }

  showAddPuestoDialog() {
    if (this.currarea === null || this.currarea === undefined) {
      this.dialog.open(DialogmessageComponent, {data: {mensaje: 'Para agregar un puesto debe de seleccionar una área primero.', icono: 1}});
    } else {
      this.catareasservice.setCurrArea(this.currarea);
      this.catpuestos.setCurrPuesto(new Puestos());
      this.dialog.open(AbcPuestosComponent,{data: {accion: 'Nuevo Puesto'}});
    }
  }

  showEditPuestoDialog() {
    console.log('Editar Puesto > ', this.currarea, this.currpuesto);
    if (this.currarea === null || this.currarea === undefined || this.currpuesto === null || this.currpuesto === undefined) {
      this.dialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el área y puesto que quiere editar.', icono: 1}});
    } else {
      this.catareasservice.setCurrArea(this.currarea);
      this.catpuestos.setCurrPuesto(this.currpuesto);
      this.dialog.open(AbcPuestosComponent, {data: {accion: 'Edicion de Puesto'}});
    }
  }

  showConfirmDialog() {}

}
