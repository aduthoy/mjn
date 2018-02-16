import { Component, OnInit } from '@angular/core';
import {Catpdms} from '../models/catpdms';
import {MatDialog} from '@angular/material';
import {FrmCapPdmComponent} from './frm-cap-pdm/frm-cap-pdm.component';

@Component({
  selector: 'app-cfg-cap-pdm',
  templateUrl: './cfg-cap-pdm.component.html',
  styleUrls: ['./cfg-cap-pdm.component.css']
})
export class CfgCapPdmComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onClickButton(accion: number) {
    console.log('La acccion recibida fue:', accion);
    if (accion === 1) {
      let dialogRef =  this.dialog.open(FrmCapPdmComponent);
    }
  }

  onClickNewButton() {
    this.dialog.open(FrmCapPdmComponent, { data: Catpdms});
  }
  /*
  openDialog(action: number, registro: Catpdms) {
    if (action === 1) {
      let dialogRef = this.dialog.open(FrmCapPdmComponent);
    }
  }*/

}
