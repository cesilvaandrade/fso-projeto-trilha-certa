// login.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ApiService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  vagas: number = 1;

  constructor(private apiService: ApiService, private router: Router) {
    this.loginForm = new FormGroup({
      cpf: new FormControl('', Validators.required)
    });
  }

  cadastrar() {

      this.apiService.cadastroAluno(this.loginForm.get('cpf')?.value).subscribe(
        response => {
          alert('Aluno cadastrado com sucesso!');
          this.router.navigate([`/turno/${this.loginForm.get('cpf')?.value}`]);
        },
        error => {
          console.error('Erro ao cadastrar aluno:', error);
          this.router.navigate([`/turno/${this.loginForm.get('cpf')?.value}`]);
          alert('Erro ao cadastrar aluno');
        }
      );

  }

  obterInfo() {
    this.apiService.getInfo(this.loginForm.get('cpf')?.value).subscribe(
      response => {
        alert(response)
      },
      error => {
        console.error('Erro ao obter informações:', error);
      }
    );
  }


  hasVagas(): boolean{
    return this.vagas >= 1
  }

}
