import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {PersonalService} from '../services/personal.service';
import {Employees} from '../models/employees';
import {CatAreas} from '../models/cat-areas';
import {CatAreasService} from '../services/cat-areas.service';

@Component({
  selector: 'app-pruebas-controles',
  templateUrl: './pruebas-controles.component.html',
  styleUrls: ['./pruebas-controles.component.css']
})
export class PruebasControlesComponent implements OnInit {

  nombreCtrl: FormControl;
  listaEmp: Employees[] = [];
  id_area: number;

  public areas: CatAreas[];

  public empleados: Employees[];
  public searchField: FormControl;

  constructor( private svrPersonal: PersonalService, private svrAreas: CatAreasService) {

    this.svrPersonal.getAllPersonal().then( (a: Employees[]) => {
      this.empleados = a;
    });

    this.svrAreas.getAllCatAreas().then((b: CatAreas[]) => {
      this.areas = b;
    });
    this.nombreCtrl = new FormControl();
  }

  ngOnInit() {
    this.searchField = new FormControl();

      this.searchField.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(nom => {
        this.filterEmps(nom);
      });
  }

  public filterEmps(nombre_filtrar: string) {
    this.listaEmp = this.empleados.filter( nombre => (nombre.nombre.toLowerCase()
        .indexOf(nombre_filtrar.toLowerCase()) !== -1)
    );
    console.log('Empleado Seleccionado ', this.listaEmp);
  }

  public AddEmployee() {
    if (this.listaEmp.length === 0) {
      alert('Ningun empleado seleccionado');
    } else {
      if (this.listaEmp.length > 1) {
        console.log('aggregar varios empleados');
      } else {
        console.log('Agregar el empleado id = ', this.listaEmp[0].id);
      }
    }
  }

  public getEmpsByArea() {
    console.log('Cambio la Seleccion del Area =>', this.id_area);
    this.searchField.setValue('');
    if (this.id_area > 0) {
      console.log('Buscando Personal del area señalada');
      this.svrPersonal.getPersonalByArea(this.id_area).then(( a: Employees[]) => {
        this.empleados = a;
        this.listaEmp = a;
      });
    } else {
      console.log('Cargando todos los empeleados');
      this.svrPersonal.getAllPersonal().then( (a: Employees[]) => {
        this.empleados = a;
        this.listaEmp = a;
      });
    }
  }
}
