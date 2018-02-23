import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../app.component';
import {CatCapEspecifica} from '../../models/cat-cap-especifica';
import {CatCursosEspecificosService} from '../../services/cat-cursos-especificos.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CatCapGeneral} from '../../models/cat-cap-general';

@Component({
  selector: 'app-frm-cap-especifica',
  templateUrl: './frm-cap-especifica.component.html',
  styleUrls: ['./frm-cap-especifica.component.css']
})
export class FrmCapEspecificaComponent implements OnInit {

  idCurso = '';
  nombreCurso = '';
  descripcionCurso = '';
  cursoAcitvo = true;
  modo = false;

  cce: CatCapEspecifica;

  // Validador de idCurso
  idCursoValidator = new FormControl('', [
    Validators.required
  ]);

  // Validador del nombre del curso
  nombreCursoValidator = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  matcher = new MyErrorStateMatcher();

  constructor(private catcurespservice: CatCursosEspecificosService , private matdialogref: MatDialogRef<FrmCapEspecificaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('En Frm_Cap_Especifica');
  }

  ngOnInit() {
    if (this.data.accion === 'Alta Nuevo Curso Especifico') {
      this.cce = new CatCapGeneral();
    } else  {
      if (this.catcurespservice.getCurrCursoEspecifio() != null) {
        this.cce = this.catcurespservice.getCurrCursoEspecifio();
      }
    }
    console.log('CCE =', this.cce);
    console.log('Accino =', this.data.accion);
  }

  onCancel() {
    console.log('CCE operación Cancelada');
    this.matdialogref.close();
  }
}
