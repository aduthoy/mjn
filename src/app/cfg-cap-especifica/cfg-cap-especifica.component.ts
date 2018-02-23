import { Component, OnInit } from '@angular/core';
import {GridOptions} from 'ag-grid';
import {CatCapEspecifica} from '../models/cat-cap-especifica';
import {MatDialog} from '@angular/material';
import {CatCursosEspecificosService} from '../services/cat-cursos-especificos.service';
import {FrmCapEspecificaComponent} from './frm-cap-especifica/frm-cap-especifica.component';

@Component({
  selector: 'app-cfg-cap-especifica',
  templateUrl: './cfg-cap-especifica.component.html',
  styleUrls: ['./cfg-cap-especifica.component.css']
})
export class CfgCapEspecificaComponent implements OnInit {

  gridOptions: GridOptions;
  catcapespecifica: CatCapEspecifica[];
  catespecifica: CatCapEspecifica;

  constructor(public dialog: MatDialog, private catcurespecificosservice: CatCursosEspecificosService) {
    this.catcurespecificosservice.getAllCursosEspecificos().then((cur: CatCapEspecifica[]) => {this.catcapespecifica = cur; });

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
    this.dialog.open(FrmCapEspecificaComponent, {data: {accion: 'Alta Nuevo Curso Especifico'}});
  }

  onClickEditButton() {
    if (this.catespecifica === null) {
      alert('Favor de seleccionar un Curso');
    } else {
      this.dialog.open(FrmCapEspecificaComponent, {data: {accion: 'Edición de Curso Especifico'}});
    }
  }

  onGridReady() {
    this.gridOptions.rowData = this.catcapespecifica;
  }

  onSelectedRow(event: any) {
    this.catespecifica = event.api.getSelectedRows()[0];
    this.catcurespecificosservice.setCurrCursoEspecifio(this.catespecifica);
    console.log('SELECCION =>', this.catespecifica);
  }

}
