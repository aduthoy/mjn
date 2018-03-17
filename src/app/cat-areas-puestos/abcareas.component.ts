import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
//import {FormGroup} from '@angular/forms';
import {CatAreas} from '../models/cat-areas';
import {CatAreasService} from '../services/cat-areas.service';

@Component({
  selector: 'app-abcareas',
  templateUrl: './abcareas.component.html',
  styleUrls: ['./abcareas.component.css']
})
export class AbcareasComponent implements OnInit {

  currarea: CatAreas;

  constructor(private areasservice: CatAreasService, private matdialog: MatDialogRef<AbcareasComponent>,
              @Inject(MAT_DIALOG_DATA) public datos: any)  { }

  ngOnInit() {
    this.currarea = this.areasservice.getCurrArea();
  }

  onclikAdd() {
    if (this.datos.accion === 'Nueva Area') {
      this.areasservice.postCatAreas(this.currarea).then();
    } else {
      this.areasservice.putCatAras(this.currarea).then();
    }
    this.matdialog.close();
  }
  onCancel() {
    this.matdialog.close();
  }

}
