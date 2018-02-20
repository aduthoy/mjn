import { Component, OnInit } from '@angular/core';
import {GridOptions} from 'ag-grid';
import {CatCapEspecifica} from '../models/cat-cap-especifica';

@Component({
  selector: 'app-cfg-cap-especifica',
  templateUrl: './cfg-cap-especifica.component.html',
  styleUrls: ['./cfg-cap-especifica.component.css']
})
export class CfgCapEspecificaComponent implements OnInit {

  gridOption: GridOptions;
  catcapespecifica: CatCapEspecifica[];
  constructor() { }

  ngOnInit() {
  }

}
