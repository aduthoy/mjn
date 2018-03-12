import { Component, OnInit } from '@angular/core';
import {Catpdms} from '../models/catpdms';
import {MatDialog} from '@angular/material';
import {FrmCapPdmComponent} from './frm-cap-pdm/frm-cap-pdm.component';
import {GridOptions} from 'ag-grid';
import {CatPdmService} from '../services/cat-pdm.service';
import {DialogmessageComponent} from '../dialogmessage/dialogmessage.component';

@Component({
  selector: 'app-cfg-cap-pdm',
  templateUrl: './cfg-cap-pdm.component.html',
  styleUrls: ['./cfg-cap-pdm.component.css']
})
export class CfgCapPdmComponent implements OnInit {

  gridOptions: GridOptions;
  catPdms: Catpdms[];
  catpdm: Catpdms;

  constructor(public dialog: MatDialog, public msgDialog: MatDialog, private catpdmservice: CatPdmService) {

    this.gridOptions = <GridOptions>{
      rowSelection: 'single',
      enableFilter: true,
      enableSorting: true,
      enableColResize: true
    };

    this.gridOptions.columnDefs = [
      { headerName: 'Código Actual', field: 'cveActualpdm'},
      { headerName: 'Código Anterior', field: 'cveAnteriorPmd'},
      { headerName: 'Titulo', field: 'tituloPdm'},
      { headerName: 'Status', field: 'fk_statusPmd'},
      { headerName: 'Fecha Efectiva', field: 'fechaEfectivaPdm'},
      { headerName: 'Dueño del Documento', field: 'duenoDocPdm'},
      { headerName: 'Proceso', field: 'nombreProcesoPdm'},
      { headerName: 'Area', field: 'fk_areaPdm'},
      { headerName: 'Estatus', field: 'fk_estatusPdm'},
      { headerName: 'Actvio', field: 'activo'},
      { headerName: 'Usuario Creo', field: 'fk_user_create'},
      { headerName: 'Fecha Creación', field: 'created_at'},
      { headerName: 'Usuario Modifico', field: 'fk_user_update'},
      { headerName: 'Fecha Modificación', field: 'updated_at'},
    ];

    this.dialog.afterAllClosed.subscribe((b: any) => {
      this.catpdmservice.getAllPdms().then((d: Catpdms[]) => {
        this.gridOptions.rowData = d;
      });
    });
  }

  ngOnInit() {
  }

  onClickNewButton() {
    this.catpdmservice.setcurrPDM(new Catpdms());
    this.dialog.open(FrmCapPdmComponent, { data: { accion: 'Alta Nuevo PDM'}});
  }

  onClickEditButton() {
    if (this.catpdm === null || this.catpdm === undefined) {
      this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el PDM a editar por favor.', icono: 1, dialogtype: 1}});
    } else {
      this.dialog.open(FrmCapPdmComponent , { data: { accion: 'Edición PDM'}});
    }
  }

  onClickDeleteButton() {
    if (this.catpdm === null || this.catpdm === undefined) {
      this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seleccione el PDM a eliminar, por favor.', icono: 1, dialogtype: 1}});
    } else {
      const dialogref = this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Seguro de eliminar el PDM ' + this.catpdm.tituloPdm,
          icono: 3, dialogtype: 2}});
      dialogref.afterClosed().subscribe( (respuesta: number) => {
        if (respuesta !== undefined) {
          console.log('Hay que borrar');
          this.catpdmservice.deletePdm(this.catpdm).then( d => {
            this.catpdmservice.getAllPdms().then((e: Catpdms[]) => {
              this.gridOptions.rowData = e;
              console.log('Actualizando PDM');
            });
            this.catpdm = null;
          });
        } else {
          console.log('Se arrepintio');
          this.catpdm = null;
        }
      });
    }
  }

  public onGridReady(event: any) {
    console.log('Número de Registros =>', this.catPdms);
  }

  public onSeletedRow(event: any) {
    this.catpdm = event.api.getSelectedRows()[0];
    this.catpdmservice.setcurrPDM(this.catpdm);
    console.log('SELECCION =>', this.catpdm)
    console.log('CATPDM => ', this.catpdmservice.getcurrPDM());
  }
}
