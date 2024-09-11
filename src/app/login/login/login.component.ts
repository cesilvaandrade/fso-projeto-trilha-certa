// login.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  vagas: number = 1;

  constructor() {
    this.loginForm = new FormGroup({
      cpf: new FormControl('', Validators.required)
    });
  }

  hasVagas(): boolean{
    return this.vagas >= 1
  }

}
