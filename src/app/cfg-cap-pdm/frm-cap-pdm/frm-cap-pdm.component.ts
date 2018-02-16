import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../app.component';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operator/startWith';
import {PdmPropietariosService} from '../../services/pdm-propietarios.service';
import {map} from 'rxjs/operator/map';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Catpdms} from '../../models/catpdms';


@Component({
  selector: 'app-frm-cap-pdm',
  templateUrl: './frm-cap-pdm.component.html',
  styleUrls: ['./frm-cap-pdm.component.css']
})
export class FrmCapPdmComponent implements OnInit {

  idCurso = '';
  nombreCurso = '';
  descripcionCurso = '';
  urlPDM = '';
  cursoAcitvo = true;

  status = [
    {idStatus: '-1', descStatus: 'Retired'},
    {idStatus: '0', descStatus: 'Draft'},
    {idStatus: '1', descStatus: 'Effective'}
  ];

  propietarioCtrl: FormControl;
  filtroPropietarios: Observable<any[]>;

  propDoctos: PdmPropietariosService [] = [
    {idPropietario: '1', nombrePropietario: 'Portillo, Jose'},
    {idPropietario: '2', nombrePropietario: 'Leyva, Carloina'},
    {idPropietario: '3', nombrePropietario: 'Quezada Miramontes, Leona Yazmin'},
    {idPropietario: '4', nombrePropietario: 'Armendariz, Josecarlos'},
    {idPropietario: '5', nombrePropietario: 'Robles Leyva, Magda'},
    {idPropietario: '6', nombrePropietario: 'Varela, Jorge'},
    {idPropietario: '7', nombrePropietario: 'Bejarano Nevarez, Monica Judith'},
    {idPropietario: '8', nombrePropietario: 'Estrada, Ana'},
    {idPropietario: '9', nombrePropietario: 'Marquez Guerrero, Elsa María'},
    {idPropietario: '10', nombrePropietario: 'Chavez Esquivel, Crisn Lariza'}
  ];

  Procesos = [
      {idProceso:'1', nombreProceso:'Procedimientos generales de planta'},
      {idProceso:'1', nombreProceso:'Sistemas de calidad'},
      {idProceso:'1', nombreProceso:'Ingenieria'},
      {idProceso:'1', nombreProceso:'Control de calidad. Lab Propiedades fisicas'},
      {idProceso:'1', nombreProceso:'Control de calidad. Lab Microbiologia'},
      {idProceso:'1', nombreProceso:'Calidad Departamento General'},
      {idProceso:'1', nombreProceso:'Aseguramiento de calidad/Muestras'}
  ];

  Estados =[
    {idEstado:'1', nombreEstado:'Vigente'},
    {idEstado:'1', nombreEstado:'Requiere Completar'},
    {idEstado:'1', nombreEstado:'Vencido Revisar'},
    {idEstado:'1', nombreEstado:'Eliminado'}
  ];

  Areas =[
    {idArea:'1', nombreArea:'Seguridad'},
    {idArea:'1', nombreArea:'RH'},
    {idArea:'1', nombreArea:'QS'},
    {idArea:'1', nombreArea:'QC'},
    {idArea:'1', nombreArea:'QA'},
    {idArea:'1', nombreArea:'QC'},
    {idArea:'1', nombreArea:'Producción'},
    {idArea:'1', nombreArea:'Mantenimiento'}
  ];

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

  constructor( private matDialogRef: MatDialogRef<FrmCapPdmComponent>,
               @Inject(MAT_DIALOG_DATA) public curso: Catpdms) {
    this.propietarioCtrl = new FormControl();
    /*this.filtroPropietarios = this.propietarioCtrl.valueChanges
    .pipe(
        startWith(''),
        map(prop => prop ? this.filtrarPriopietarios(prop) : this.propDoctos.slice())
      );*/
  }

  filtrarPriopietarios(nombre: string) {
    return this.propDoctos.filter(prop => prop.nombrePropietario.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
  }
  ngOnInit() {
  }

  public onCancel() {
    console.log('Alta PDM Canelada');
    this.matDialogRef.close();
  }
}
