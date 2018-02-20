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

  idCurso = '';
  nombreCurso = '';
  descripcionCurso = '';
  cursoAcitvo = true;

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

  public onCancel() {
    console.log('CCG operación Canelada');
    this.matDialogRef.close();
  }
}
