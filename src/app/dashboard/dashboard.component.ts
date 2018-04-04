import { Component, OnInit } from '@angular/core';
import {TrainingDatesService} from '../services/training-dates.service';
import {DashResumen} from '../models/dash-resumen';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  res_proxavencer: DashResumen = new DashResumen();
  res_programados: DashResumen = new DashResumen();
  res_cursados: DashResumen = new DashResumen();

  constructor(private svrDash: TrainingDatesService) {
    this.svrDash.getProximosaVencerByUserId(1).then( (a: DashResumen) => {
      this.res_proxavencer = a[0];
      console.log(a);
      console.log('Proximos a vencer ', this.res_proxavencer);
    });

    this.svrDash.getProgramadosByUserId(1).then( (a: DashResumen) => {
      this.res_programados = a[0];
      console.log(a);
      console.log('Proximos a vencer ', this.res_programados);
    });

    this.svrDash.getCursadosByUserId(1).then( (a: DashResumen) => {
      this.res_cursados = a[0];
      console.log(a);
      console.log('Proximos a vencer ', this.res_cursados);
    });

  }

  ngOnInit() {
  }

}
