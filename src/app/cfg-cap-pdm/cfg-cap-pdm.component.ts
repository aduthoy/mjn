import { Component, OnInit } from '@angular/core';
import {Catpdms} from '../models/catpdms';
import {MatDialog} from '@angular/material';
import {FrmCapPdmComponent} from './frm-cap-pdm/frm-cap-pdm.component';
import {GridOptions} from 'ag-grid';
import {CatPdmService} from '../services/cat-pdm.service';

@Component({
  selector: 'app-cfg-cap-pdm',
  templateUrl: './cfg-cap-pdm.component.html',
  styleUrls: ['./cfg-cap-pdm.component.css']
})
export class CfgCapPdmComponent implements OnInit {

  rowSelection;
  private gridApi;

  gridOptions: GridOptions;
  catPdms: Catpdms[];
  catpdm: Catpdms;

  constructor(public dialog: MatDialog, private catpdmservice: CatPdmService) {

    this.catpdmservice.getAllPdms().then((d: Catpdms[]) => {
      this.catPdms = d;
    });

    this.gridOptions = <GridOptions>{
      rowSelection: 'single',
      enableFilter: true,
      enableSorting: true,
      enableColResize: true
    };

    this.gridOptions.columnDefs = [
      { headerName: 'Código Actual', field: 'codigoactual'},
      { headerName: 'Código Anterior', field: 'codigoanterior'},
      { headerName: 'Titulo', field: 'titulo'},
      { headerName: 'Fecha Efectiva', field: 'fechaEfectiva'},
      { headerName: 'Status', field: 'status'},
      { headerName: 'Dueño del Documento', field: 'duenodoc'},
      { headerName: 'Proceso', field: 'proceso'},
      { headerName: 'Area', field: 'area'},
      { headerName: 'Estatus', field: 'estatus'},
    ];


  }

  ngOnInit() {
  }

  onClickNewButton() {
    this.dialog.open(FrmCapPdmComponent, { data: { accion: 'Alta Nuevo PDM'}});
  }

  onClickEditButton() {
    if (this.catpdm = null) {
      alert('Seleccione un curso');
    }
    this.dialog.open(FrmCapPdmComponent , { data: { accion: 'Edición PDM'}});
  }

  public onGridReady(event: any) {
    console.log('Número de Registros =>', this.catPdms);
    this.gridOptions.rowData = this.catPdms;
  }

  public onSeletedRow(event: any) {
    this.catpdm = event.api.getSelectedRows()[0];
    this.catpdmservice.setcurrPDM(this.catpdm);
    console.log('SELECCION =>', this.catpdm)
    console.log('CATPDM => ', this.catpdmservice.getcurrPDM());
  }

  public editReg(event) {
    let catpdm: Catpdms = event.data;
  }

}
