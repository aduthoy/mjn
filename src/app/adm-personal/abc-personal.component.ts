import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Personal} from '../models/personal';
import {CatAreasService} from '../services/cat-areas.service';
import {CatPuestosService} from '../services/cat-puestos.service';
import {CatAreas} from '../models/cat-areas';
import {Puestos} from '../models/puestos';
import {PersonalService} from '../services/personal.service';

@Component({
  selector: 'app-abc-personal',
  templateUrl: './abc-personal.component.html',
  styleUrls: ['./abc-personal.component.css']
})
export class AbcPersonalComponent implements OnInit {

  public currEmpleado: Personal;
  public areas: CatAreas[];
  public puesos: Puestos[];
  private area: CatAreas;
  private puesto: Puestos;

  constructor(private svrArea: CatAreasService, private svrPuesto: CatPuestosService, private svrPersonal: PersonalService,
    private dialogRef: MatDialogRef<AbcPersonalComponent>, @Inject (MAT_DIALOG_DATA) public data: any) {

    this.svrArea.getAllCatAreas().then((res: CatAreas[]) => { this.areas = res; });
  }

  ngOnInit() {
    this.currEmpleado = this.svrPersonal.getCurrEmpleado();
    console.log('Areas =>', this.areas, ' Empleado ', this.currEmpleado);
    if (this.data.accion === 'Editando Personal') {
      console.log('LLenando los pustaos del áera del empleado no:', this.currEmpleado.areaEmpleado.idArea);
      this.svrPuesto.getAllPuestosByArea(this.currEmpleado.areaEmpleado.idArea).then( (p: Puestos[]) => {this.puesos = p; });
    }
  }

  buscaPuestos(evento: any) {
    console.log(evento);
    this.svrPuesto.getAllPuestosByArea(evento.value).then((p: Puestos[]) => { this.puesos = p; });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAceptar() {
    let areaReady = false;
    let puestoReady = false;

    this.svrArea.getCatAreasById(this.currEmpleado.areaEmpleado.idArea).then(( a: CatAreas) =>
          { this.currEmpleado.areaEmpleado.idArea = a[0]; console.log('AREA: ', a[0]);
          });
    this.svrPuesto.getPuestoById(this.currEmpleado.puestoEmpleado.puestoId).then((a: Puestos) =>
          {this.currEmpleado.puestoEmpleado.puestoId = a[0]; console.log('PUESTO ', a[0]);
          });

    console.log('Current Empleado', this.currEmpleado);
    this.svrPersonal.guardarEmpleado(this.currEmpleado).then();
    this.dialogRef.close();
  }

}
