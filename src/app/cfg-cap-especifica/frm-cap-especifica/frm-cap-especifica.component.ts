import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../app.component';

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
