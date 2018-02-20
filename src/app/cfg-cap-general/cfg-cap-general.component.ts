import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {GridOptions} from 'ag-grid';
import {CatCapGeneral} from '../models/cat-cap-general';
import {CatCursosGeneralService} from '../services/cat-cursos-general.service';
import {FrmCapGeneralComponent} from './frm-cap-general/frm-cap-general.component';

@Component({
  selector: 'app-cfg-cap-general',
  templateUrl: './cfg-cap-general.component.html',
  styleUrls: ['./cfg-cap-general.component.css']
})
export class CfgCapGeneralComponent implements OnInit {

  gridOptions: GridOptions;
  catcapgeneral: CatCapGeneral[];
  catgneral: CatCapGeneral;

  constructor(public dialog: MatDialog, private catcapgensevice: CatCursosGeneralService ) {

    this.catcapgensevice.getAllCursosCapGeneral().then((d: CatCapGeneral[]) => {
      this.catcapgeneral = d;
    });

    this.gridOptions = <GridOptions>{
      rowSelection: 'single',
      enableFilter: true,
      enableSorting: true,
      enableColResize: true,
    };

    this.gridOptions.columnDefs = [
      { headerName: 'ID Curso', field: 'idCurso'},
      { headerName: 'Titulo de Curso', field: 'temaCurso'},
      { headerName: 'Descripción del Curso', field: 'descCurso'},
      { headerName: 'Fecha Efectiva', field: 'fechaEfectiva'},
      { headerName: 'Estatus', field: 'estatus'},
    ];

  }

  ngOnInit() {
  }



  onClickNewButton() {
    console.log('Trantado de abrir el Dialogo');
    this.dialog.open(FrmCapGeneralComponent, { data: { accion: 'Alta Nuevo CCG'}});
  }

  onClickEditButton() {
    if (this.catgneral = null) {
      alert('Seleccione un curso');
    }
    this.dialog.open(FrmCapGeneralComponent , { data: { accion: 'Edición CCG'}});
  }

  public onGridReady(event: any) {
    this.gridOptions.rowData = this.catcapgeneral;
  }

  public onSeletedRow(event: any) {
    this.catgneral = event.api.getSelectedRows()[0];
    this.catcapgensevice.setCurrCursoGeneral(this.catgneral);
    console.log('SELECCION =>', this.catgneral)
    console.log('CATPDM => ', this.catcapgensevice.getCurrCursoGeneral());
  }

}
