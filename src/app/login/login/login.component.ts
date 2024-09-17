// login.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {WebSocketService} from "../../websocket.service";
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

	constructor(private apiService: ApiService, private webSocketService: WebSocketService, private router: Router) {
		this.loginForm = new FormGroup({
			cpf: new FormControl('', Validators.required)
		});
	}

	cadastrar() {
		this.apiService.cadastroAluno(this.loginForm.get('cpf')?.value).subscribe(
			response => {
				alert('Aluno cadastrado com sucesso!');
				const cpf = this.loginForm.get('cpf')?.value;
			},
			error => {
				console.error('Erro ao cadastrar aluno:', error);
				alert('Erro ao cadastrar aluno');
			}
		);
	}

	obterInfo() {
		const cpf = this.loginForm.get('cpf')?.value;
		this.webSocketService.connect(cpf);
		this.router.navigate([`/turno`]);
	}

	hasVagas(): boolean{
		return this.vagas >= 1
	}

}
