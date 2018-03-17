import { Component, OnInit } from '@angular/core';
import {GridOptions} from 'ag-grid';
import {CatCapEspecifica} from '../models/cat-cap-especifica';
import {MatDialog} from '@angular/material';
import {CatCursosEspecificosService} from '../services/cat-cursos-especificos.service';
import {FrmCapEspecificaComponent} from './frm-cap-especifica/frm-cap-especifica.component';
import {CatCapGeneral} from '../models/cat-cap-general';
import {DialogmessageComponent} from '../dialogmessage/dialogmessage.component';

@Component({
  selector: 'app-cfg-cap-especifica',
  templateUrl: './cfg-cap-especifica.component.html',
  styleUrls: ['./cfg-cap-especifica.component.css']
})
export class CfgCapEspecificaComponent implements OnInit {

  gridOptions: GridOptions;
  catcapespecifica: CatCapEspecifica[];
  catespecifica: CatCapEspecifica;

  constructor(public dialog: MatDialog, public msgDialog: MatDialog, private catcurespecificosservice: CatCursosEspecificosService) {

    this.gridOptions = <GridOptions>{
      rowSelection: 'single',
      enableFilter: true,
      enableSorting: true,
      enableColResize: true,
    };

    this.gridOptions.columnDefs = [
      { headerName: 'Id', field: 'id', hide: true},
      { headerName: 'Cve. Curso', field: 'cve_curso', width: 120},
      { headerName: 'Nombre de Curso', field: 'nombre_curso', width: 300},
      { headerName: 'Tema del Curso', field: 'tema_curso', width: 250},
      { headerName: 'Instructor', field: 'instructor_curso'},
      { headerName: 'Area Resp.', field: 'area_imparte_curso'},
      { headerName: 'Duración', field: 'duracionCurso'},
      { headerName: 'Estatus', field: 'estatus_curso'},
      { headerName: 'Usuario Creo', field: 'fk_user_create'},
      { headerName: 'Fecha Creacion', field: 'created_at'},
      { headerName: 'Usuario Modifico', field: 'fk_user_update'},
      { headerName: 'Fecha Ult. Mod.', field: 'updated_at'},
    ];

    this.dialog.afterAllClosed.subscribe((b: any) => {
      this.catcurespecificosservice.getAllCursosEspecificos().then((d: CatCapGeneral[]) => {
        this.gridOptions.rowData = d;
        console.log('Actualizando Cursos');
      });
    });
  }

  ngOnInit() {
  }

  onClickNewButton() {
    this.catcurespecificosservice.setCurrCursoEspecifio(new CatCapEspecifica());
    this.dialog.open(FrmCapEspecificaComponent, {data: {accion: 'Alta Nuevo Curso Especifico'}});
  }

  onClickEditButton() {
    if (this.catespecifica === null || this.catespecifica === undefined) {
      this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el curso a editar por favor.', icono: 1, dialogtype: 1}});
    } else {
      this.dialog.open(FrmCapEspecificaComponent, {data: {accion: 'Edición de Curso Especifico'}});
    }
  }

  onClickDeleteEspButton() {
    console.log('Tratando de Borrar');
    if (this.catespecifica === null || this.catespecifica === undefined) {
      this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el curso a eliminar, por favor.', icono: 1, dialogtype: 1}});
    } else {
      const dialogref = this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seguro de eliminar el curso ' +
          this.catespecifica.nombre_curso,
          icono: 3, dialogtype: 2}});
      dialogref.afterClosed().subscribe( (respuesta: number) => {
        if (respuesta !== undefined) {
          console.log('Hay que borrar', this.catespecifica);
          this.catcurespecificosservice.deleteCursoEspecifico(this.catespecifica).then( d => {
            this.catcurespecificosservice.getAllCursosEspecificos().then((e: CatCapGeneral[]) => {
              this.gridOptions.rowData = e;
              console.log('Actualizando Cursos');
            });
            this.catcapespecifica = null;
          });
        } else {
          console.log('Se arrepintio');
          this.catcapespecifica = null;
        }
      });
    }
  }

  onGridReady() {}

  onSelectedRow(event: any) {
    this.catespecifica = event.api.getSelectedRows()[0];
    this.catcurespecificosservice.setCurrCursoEspecifio(this.catespecifica);
    console.log('SELECCION =>', this.catespecifica);
  }

}
