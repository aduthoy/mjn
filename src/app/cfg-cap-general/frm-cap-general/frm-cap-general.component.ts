import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../app.component';

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

  // Validador de idCurso
  idCursoValidator = new FormControl('', [
    Validators.required
  ]);

  // Validador del nombre del curso
  nombreCursoValidator = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  matcher = new MyErrorStateMatcher();

  constructor() {
  }

  ngOnInit() {
  }

}
