import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {GridOptions} from 'ag-grid';
import {CatCapGeneral} from '../models/cat-cap-general';
import {CatCursosGeneralService} from '../services/cat-cursos-general.service';
import {FrmCapGeneralComponent} from './frm-cap-general/frm-cap-general.component';
import {DialogmessageComponent} from '../dialogmessage/dialogmessage.component';

@Component({
  selector: 'app-cfg-cap-general',
  templateUrl: './cfg-cap-general.component.html',
  styleUrls: ['./cfg-cap-general.component.css']
})
export class CfgCapGeneralComponent implements OnInit {

  gridOptions: GridOptions;
  catgneral: CatCapGeneral;

  constructor(public dialog: MatDialog, public msgDialog: MatDialog, private catcapgensevice: CatCursosGeneralService ) {

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
      this.catcapgensevice.getAllCursosCapGeneral().then((d: CatCapGeneral[]) => {
        this.gridOptions.rowData = d;
        console.log('Actualizando Cursos');
      });
    });
  }

  ngOnInit() {
  }

  onClickNewButton() {
    console.log('Trantado de abrir el Dialogo');
    this.catcapgensevice.setCurrCursoGeneral(new CatCapGeneral());
    this.dialog.open(FrmCapGeneralComponent, { data: { accion: 'Alta Nuevo CCG'}});
  }

  onClickEditButton() {
    if (this.catgneral === null || this.catgneral === undefined) {
      this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el curso a editar por favor.', icono: 1, dialogtype: 1}});
    } else {
      this.dialog.open(FrmCapGeneralComponent, {data: {accion: 'Edición CCG'}});
    }
  }

  onClickDeleteButton() {
    if (this.catgneral === null || this.catgneral === undefined) {
      this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el curso a eliminar, por favor.', icono: 1, dialogtype: 1}});
    } else {
      const dialogref = this.msgDialog.open(DialogmessageComponent,
        {data: {mensaje: 'Seguro de eliminar el curso ' + this.catgneral.nombre_curso,
          icono: 3, dialogtype: 2}});
      dialogref.afterClosed().subscribe( (respuesta: number) => {
        if (respuesta !== undefined) {
          console.log('Hay que borrar');
          this.catcapgensevice.deleteCursoGenera(this.catgneral).then( d => {
            this.catcapgensevice.getAllCursosCapGeneral().then((e: CatCapGeneral[]) => {
              this.gridOptions.rowData = e;
              console.log('Actualizando Cursos');
            });
            this.catgneral = null;
          });
        } else {
          console.log('Se arrepintio');
          this.catgneral = null;
        }
      });
    }
  }

  public onGridReady(event: any) {
    console.log('Refresh Grid');
  }

  public onSeletedRow(event: any) {
    this.catgneral = event.api.getSelectedRows()[0];
    this.catcapgensevice.setCurrCursoGeneral(this.catgneral);
    console.log('SELECCION =>', this.catgneral);
  }

}
