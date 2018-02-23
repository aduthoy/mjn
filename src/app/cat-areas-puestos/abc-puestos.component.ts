import {Component, Inject, OnInit} from '@angular/core';
import {Puestos} from '../models/puestos';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CatAreas} from '../models/cat-areas';
import {CatAreasService} from '../services/cat-areas.service';
import {CatPuestosService} from '../services/cat-puestos.service';

@Component({
  selector: 'app-abc-puestos',
  templateUrl: './abc-puestos.component.html',
  styleUrls: ['./abc-puestos.component.css']
})
export class AbcPuestosComponent implements OnInit {

  currarea: CatAreas;
  currpuesto: Puestos;

  constructor(private areaSrv: CatAreasService,
              private puestoSrv: CatPuestosService,
              private  dialogRef: MatDialogRef<AbcPuestosComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.currarea = this.areaSrv.getCurrArea();
    this.currpuesto = this.puestoSrv.getCurrPuesto();
  }

  onCancel() {
    this.dialogRef.close();
  }

}
