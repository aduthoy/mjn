import { Component, OnInit } from '@angular/core';
import {CatAreas} from '../models/cat-areas';
import {CatAreasService} from '../services/cat-areas.service';
import {CatPuestosService} from '../services/cat-puestos.service';
import {Puestos} from '../models/puestos';
import {GridOptions} from 'ag-grid';
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
  gridAreas: GridOptions;
  gridPuesto: GridOptions;

  constructor(private catareasservice: CatAreasService, private catpuestos: CatPuestosService, private dialog: MatDialog,
              private msgDialog: MatDialog) {

    this.gridAreas = <GridOptions> {
      rowSelection: 'single'
    };

    this.gridPuesto = <GridOptions> {
      rowSelection: 'single'
    };

    this.gridAreas.columnDefs = [
      {headerName: 'Cve. Area', field: 'idAreas', width: 100},
      {headerName: 'Area', field: 'nombreArea'}
    ];

    this.gridPuesto.columnDefs = [
      {headerName: 'Cve Puesto', field: 'idpuestos', width: 150},
      {headerName: 'Desc. Puesto', field: 'nombrePuesto'}
    ];

    this.dialog.afterAllClosed.subscribe( (b: any) => {
      this.catareasservice.getAllCatAreas().then((a: CatAreas[]) => { this.gridAreas.rowData = a; });
      console.log('Actualizando Areas');
      if (this.currarea !== null && this.currarea !== undefined) {
        console.log('Actualizando Puestos del area', this.currarea);
        this.catpuestos.getAllPuestosByArea(this.currarea.id).then((a: Puestos[]) => { this.gridPuesto.rowData = a; });
      }
    });
  }

  ngOnInit() {
  }

  onSeletedAreasRow(evento: any) {
    this.currarea = evento.api.getSelectedRows()[0];
    console.log('ID del Area: ', this.currarea.idAreas );
    this.catpuestos.getAllPuestosByArea(this.currarea.id).then((a: Puestos[]) => this.gridPuesto.rowData = a);
  }

  onSeletedPuestosRow(evento: any) {
    this.currpuesto = evento.api.getSelectedRows()[0];
  }

  onGridAreasReady() {
//    this.gridAreas.rowData = this.areas;
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
      this.dialog.open(AbcPuestosComponent, {data: {accion: 'Nuevo Puesto'}});
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

  deleteArea() {
    if (this.currarea === null || this.currarea === undefined) {
      this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el area a eliminar, por favor.',
          icono: 1, dialogtype: 1}});
    } else {
      const dialogref = this.msgDialog.open(DialogmessageComponent,
        {data: {mensaje: 'Seguro de eliminar el area ' + this.currarea.nombreArea,
            icono: 3, dialogtype: 2}});
      dialogref.afterClosed().subscribe( (respuesta: number) => {
        if (respuesta !== undefined) {
          console.log('Hay que borrar el area');
          this.catareasservice.deleteCatAreas(this.currarea).then( d => {
            this.catareasservice.getAllCatAreas().then((e: CatAreas[]) => {
              this.gridAreas.rowData = e;
              console.log('Actualizando areas');
            });
            this.currarea = null;
          });
        } else {
          console.log('Se arrepintio');
          this.currarea = null;
        }
      });
    }
  }

  deletePuesto() {
    if (this.currpuesto === null || this.currpuesto === undefined) {
      this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el puesto a eliminar, por favor.',
          icono: 1, dialogtype: 1}});
    } else {
      const dialogref = this.msgDialog.open(DialogmessageComponent,
        {data: {mensaje: 'Seguro de eliminar el puesto ' + this.currpuesto.nombrePuesto,
            icono: 3, dialogtype: 2}});
      dialogref.afterClosed().subscribe( (respuesta: number) => {
        if (respuesta !== undefined) {
          console.log('Hay que borrar el puesto');
          this.catpuestos.deleteCatPuestos(this.currpuesto).then( d => {
            this.catpuestos.getAllPuestosByArea(this.currarea.id).then((e: CatAreas[]) => {
              this.gridPuesto.rowData = e;
              console.log('Actualizando puestos');
            });
            this.currpuesto = null;
          });
        } else {
          console.log('Se arrepintio');
          this.currpuesto = null;
        }
      });
    }
  }

}
