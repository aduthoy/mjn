import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogmessageComponent } from '../../dialogmessage/dialogmessage.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;

  /*employeeName: FormControl;
  employeeId: FormControl;
  email: FormControl;
  password: FormControl;
  confpassword: FormControl;
*/

  constructor(private msgDialog: MatDialog) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      employeeName: new FormControl('', [Validators.required]),
      employeeId: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [Validators.required]),
      confpassword: new FormControl('', [Validators.required]),
    });
  }

  regNewUser() {
    console.log('Form data: ', this.registerForm.value);
    console.log('p: ', this.registerForm.value.password, ' cp: ', this.registerForm.value.confpassword);
    if (this.registerForm.value.password === this.registerForm.value.confpassword ) {
      // Validar las caracteristicas del empleado
      this.registerForm.reset();
    } else {
      this.msgDialog.open(DialogmessageComponent, {data: {mensaje: 'Passwords no coinciden. Favor de verificar.', icono: 1, dialogtype: 1}});
    }
  }

}
