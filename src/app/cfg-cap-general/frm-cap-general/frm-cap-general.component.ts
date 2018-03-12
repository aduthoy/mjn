import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../app.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CatCapGeneral} from '../../models/cat-cap-general';
import {CatCursosGeneralService} from '../../services/cat-cursos-general.service';

@Component({
  selector: 'app-frm-cap-general',
  templateUrl: './frm-cap-general.component.html',
  styleUrls: ['./frm-cap-general.component.css']
})
export class FrmCapGeneralComponent implements OnInit {

  ccg: CatCapGeneral;

  // Validador de idCurso
  idCursoValidator = new FormControl('', [
    Validators.required
  ]);

  // Validador del nombre del curso
  nombreCursoValidator = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  matcher = new MyErrorStateMatcher();

  constructor( private catcapgenservice: CatCursosGeneralService, private matDialogRef: MatDialogRef<FrmCapGeneralComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('En frm-cap-general');
  }

  ngOnInit() {
    if (this.data.accion === 'Alta Nuevo CCG') {
      this.ccg = new CatCapGeneral();
    } else {
      if (this.catcapgenservice.getCurrCursoGeneral() != null) {
        this.ccg = this.catcapgenservice.getCurrCursoGeneral();
      }
    }
    console.log('CurrCCG =', this.ccg);
    console.log('Modo => ', this.data.accion);
  }

  public onAceptar() {
    console.log('Registro Nuevo => ', this.ccg);
    if (this.data.accion === 'Alta Nuevo CCG') {
      this.catcapgenservice.postCursoGeneral(this.ccg).then((a: CatCapGeneral) => console.log('Curso Almacenado', a[0]));
    } else {
      this.catcapgenservice.putCursoGeneral(this.ccg).then((a: CatCapGeneral) => console.log('Curso Modificado', a[0]));
    }
    this.matDialogRef.close();
  }

  public onCancel() {
    console.log('CCG operación Canelada');
    this.matDialogRef.close();
  }
}
