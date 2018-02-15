import { Component, OnInit } from '@angular/core';
import {RedComponentComponent} from '../red-component/red-component.component';
import { GridOptions} from 'ag-grid';
import {Users} from '../models/users';
import {HttpClient} from '@angular/common/http';
//import {UserServiceService} from '../services/user-service.service';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {
  gridOptions: GridOptions;
  usuarios: Array<Users> = [];

  constructor(private httpCliente: HttpClient ) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: 'ID', field: 'id', width: 100},
      { headerName: 'Value', field: 'value', cellRendererFramework: RedComponentComponent , width: 100}
    ];

    this.gridOptions.rowData = [
      {id: 5 , value: 10},
      {id: 10, value: 15},
      {id: 15, value: 30},
      {id: 20, value: 90},
      {id: 25, value: 180},
      {id: 30, value: 360}
    ];

    console.log(this.gridOptions.columnDefs, this.gridOptions.rowData);

    //llamada al metodo appi con Get para obtener una lista de usuarios.
    this.httpCliente.get('https://jsonplaceholder.typicode.com/users').subscribe(
      (data: any[]) => {
        console.log('usuarios en el servicio', data);
        this.usuarios = data;
      }
    );

    /*this.usuarios = new UserServiceService();
    console.log('Usuarios en el Módulo by-grid', this.usuarios);*/
  }

  ngOnInit() {
    console.log('Ya se hizo el onInit');
  }

}
