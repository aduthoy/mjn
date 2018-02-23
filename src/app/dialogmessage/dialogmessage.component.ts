import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialogmessage',
  templateUrl: './dialogmessage.component.html',
  styleUrls: ['./dialogmessage.component.css']
})
export class DialogmessageComponent implements OnInit {

  iconos: string [] = [
    'far fa-check-circle',                // OK
    'fas fa-exclamation-triangle',        // Error
    'fas fa-exclamation',                 // Warning
    'fas fa-ban'                          // No permitido
  ];
  icono = 'far fa-check-circle' + 'fa-5x';

  constructor(public dialogRef: MatDialogRef<DialogmessageComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {
    this.icono = this.iconos[data.icono] + ' fa-3x';
  }

  ngOnInit() {
  }

  onClick() {
    this.dialogRef.close();
}

}
