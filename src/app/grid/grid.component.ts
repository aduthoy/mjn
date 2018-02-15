import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, AfterViewInit {
  displayColumns = ['posicion', 'nombre', 'peso', 'simbolo'];
  dataSource = new MatTableDataSource<Elemento>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
  }
}

export interface Elemento {
  posicion: number;
  nombre: string;
  peso: number;
  simbolo: string;
}

const ELEMENT_DATA: Elemento[] = [
  {posicion: 1, nombre: 'Hydrogen', peso: 1.0079, simbolo: 'H'},
  {posicion: 2, nombre: 'Helium', peso: 4.0026, simbolo: 'He'},
  {posicion: 3, nombre: 'Lithium', peso: 6.941, simbolo: 'Li'},
  {posicion: 4, nombre: 'Beryllium', peso: 9.0122, simbolo: 'Be'},
  {posicion: 5, nombre: 'Boron', peso: 10.811, simbolo: 'B'},
  {posicion: 6, nombre: 'Carbon', peso: 12.0107, simbolo: 'C'},
  {posicion: 7, nombre: 'Nitrogen', peso: 14.0067, simbolo: 'N'},
  {posicion: 8, nombre: 'Oxygen', peso: 15.9994, simbolo: 'O'},
  {posicion: 9, nombre: 'Fluorine', peso: 18.9984, simbolo: 'F'},
  {posicion: 10, nombre: 'Neon', peso: 20.1797, simbolo: 'Ne'},
  {posicion: 11, nombre: 'Sodium', peso: 22.9897, simbolo: 'Na'},
  {posicion: 12, nombre: 'Magnesium', peso: 24.305, simbolo: 'Mg'},
  {posicion: 13, nombre: 'Aluminum', peso: 26.9815, simbolo: 'Al'},
  {posicion: 14, nombre: 'Silicon', peso: 28.0855, simbolo: 'Si'},
  {posicion: 15, nombre: 'Phosphorus', peso: 30.9738, simbolo: 'P'},
  {posicion: 16, nombre: 'Sulfur', peso: 32.065, simbolo: 'S'},
  {posicion: 17, nombre: 'Chlorine', peso: 35.453, simbolo: 'Cl'},
  {posicion: 18, nombre: 'Argon', peso: 39.948, simbolo: 'Ar'},
  {posicion: 19, nombre: 'Potassium', peso: 39.0983, simbolo: 'K'},
  {posicion: 20, nombre: 'Calcium', peso: 40.078, simbolo: 'Ca'}
];
