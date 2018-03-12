import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../app.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Catpdms} from '../../models/catpdms';
import { CatStatusService } from '../../services/cat-status.service';
import {CatStatus} from '../../models/cat-status';
import {CatProps} from '../../models/cat-props';
import {CatProcesos} from '../../models/cat-procesos';
import {CatEstatus} from '../../models/cat-estatus';
import {CatAreas} from '../../models/cat-areas';
import {CatPropsService} from '../../services/cat-props.service';
import {CatAreasService} from '../../services/cat-areas.service';
import {CatEstatusService} from '../../services/cat-estatus.service';
import {CatProcesosService} from '../../services/cat-procesos.service';
import {CatPdmService} from '../../services/cat-pdm.service';



@Component({
  selector: 'app-frm-cap-pdm',
  templateUrl: './frm-cap-pdm.component.html',
  styleUrls: ['./frm-cap-pdm.component.css']
})
export class FrmCapPdmComponent implements OnInit {

  propietarioCtrl: FormControl;
  status: CatStatus[];
  propsDoctos: CatProps[];
  procesos: CatProcesos[];
  estatus: CatEstatus[];
  areas: CatAreas[];

  public pdm: Catpdms;

  // Validador de idCurso
  idCursoValidator = new FormControl('', [
    Validators.required
  ]);

  // Validador del nombre del curso
  nombreCursoValidator = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  urlprocValidator = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  constructor (private catstatus: CatStatusService, private catprops: CatPropsService,
               private catareas: CatAreasService, private catestatus: CatEstatusService, private catprocesos: CatProcesosService,
               private matDialogRef: MatDialogRef<FrmCapPdmComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any, private catpdmservice: CatPdmService){

    console.log('Contructor de la FRM_CURSO con data = ', data);

    this.propietarioCtrl = new FormControl();

    /* Cargando los catalogos de los combos */
    this.catprops.getAllProps().then((a: CatProps[]) => {this.propsDoctos = a; });
    this.catprocesos.getAllProcesos().then((d: CatProcesos[]) => {this.procesos = d; });
    this.catestatus.getAllCatEstatus().then((c: CatEstatus[]) => {this.estatus = c; });
    this.catstatus.getAllCatStatus().then((e: CatStatus[]) => { this.status = e; });
    this.catareas.getAllCatAreas().then((b: CatAreas[]) => {this.areas = b; });

  }

  ngOnInit() {
    if (this.data.accion === 'Alta Nuevo PDM') {
      this.pdm = new Catpdms();
    } else {
      if (this.catpdmservice.getcurrPDM() != null) {
        this.pdm = this.catpdmservice.getcurrPDM();
      }
    }
    console.log('CurrPDM =', this.pdm);
    console.log('Modo => ', this.data.accion);
  }

  public onAceptar() {
    console.log('Registro Nuevo => ', this.pdm);
    console.log('Fecha Efectiva => ', this.pdm.fechaEfectivaPdm);
    if (this.data.accion === 'Alta Nuevo PDM') {
      this.catpdmservice.postPdm(this.pdm).then((a: Catpdms) => console.log('Curso Almacenado', a[0]));
    } else {
      this.catpdmservice.putPdm(this.pdm).then((a: Catpdms) => console.log('Curso Modificado', a[0]));
    }
    this.matDialogRef.close();
  }

  public onCancel() {
    console.log('Alta PDM Canelada');
    this.matDialogRef.close();
  }
}
