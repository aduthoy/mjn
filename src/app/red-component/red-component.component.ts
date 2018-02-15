import { Component } from '@angular/core';

@Component({
  selector: 'app-red-component',
  templateUrl: './red-component.component.html',
  styleUrls: ['./red-component.component.css']
})
export class RedComponentComponent {
  params: any;

  agInit(params: any): void {
    this.params = params;
    console.log('Se realiza el agInit');
  }
}
