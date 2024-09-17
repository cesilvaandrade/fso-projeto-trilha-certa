import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {WebSocketService} from "../websocket.service";
import {ApiService} from "./trilha.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-trilha',
	templateUrl: './trilha.component.html',
	styleUrls: ['./trilha.component.scss']
})
export class TrilhaComponent implements OnInit {

	enegreSerVagas = 0; // Replace with actual data
	dinheiroVagas = 0; // Replace with actual data
	admiravelVagas = 0; // Replace with actual data
	agroecologiaVagas = 0; // Replace with actual data

	cpf: string | null = '';
	turno: string | null = '';
	private messagesSubscription: Subscription | undefined;
	private errorsSubscription: Subscription | undefined;

	vez: boolean = false;

	constructor(private apiService: ApiService, private webSocketService: WebSocketService, private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {
		if (!this.webSocketService.isConnected()) {
			alert("Cpf nao esta na lista de turnos");
			this.router.navigate([`/login`]);
			return;
		}


		this.messagesSubscription = this.webSocketService.getMessages().subscribe(message => {
			if(message == 'vez'){
				this.vez = true
				alert('Está na sua vez')
				this.updateVagas();
			} else if (message == 'error'){
				alert(`${message}`)
			}
			else if (message == 'remove') {
				alert("Sua vez acabou");
				this.router.navigate([`/login`]);
			}
			else if (message == "ok") {
				if (this.vez) {
					this.router.navigate([`/login`]);
					alert("Matriculado com sucesso");
				}
			}
		});

		this.errorsSubscription = this.webSocketService.getErrors().subscribe(error => {
			console.error("Error:", error);
		});

		this.route.paramMap.subscribe(params => {
			this.turno = params.get('turno')
		});


		if(this.turno){
			if (this.turno == "matutino") {
			}
			else if (this.turno == "vespertino") {
			}
			else {
				alert("turno invalido");
				this.router.navigate([`/login`]);
			}
			this.sendMessage(this.turno)
		}
	}

	updateVagas() : void {
		if(this.turno){
			if (this.turno == "matutino") {
				this.apiService.getVagasMatutino().subscribe(
					response => {
						console.log(response);
						this.enegreSerVagas    = response["A"]; 
						this.dinheiroVagas     = response["B"]; 
						this.admiravelVagas    = response["C"]; 
						this.agroecologiaVagas = response["D"]; 
					},
					error => {
						console.error('Error:', error);
						alert('Erro interno ao servidor');
					}
				);
			}
			else if (this.turno == "vespertino") {
				this.apiService.getVagasVespertino().subscribe(
					response => {
						console.log(response);
						this.enegreSerVagas    = response["E"]; 
						this.dinheiroVagas     = response["F"]; 
						this.admiravelVagas    = response["G"]; 
						this.agroecologiaVagas = response["H"]; 
					},
					error => {
						console.error('Error:', error);
						alert('Erro interno ao servidor');
					}
				);
			}
		}
	}

	ngOnDestroy(): void {
		if (this.webSocketService) {
			this.webSocketService.close();
		}
		if (this.messagesSubscription) {
			this.messagesSubscription.unsubscribe();
		}
		if (this.errorsSubscription) {
			this.errorsSubscription.unsubscribe();
		}
	}

	async sendMessage(message: string): Promise<void> {
		try {
			await this.webSocketService.sendMessage(message);
		} catch (error) {
			console.error('Failed to send message:', error);
		}
	}

	selecionaTrilha(trilha: string){
		if(this.turno){
			if (this.turno == "vespertino") {
				const E = 'E'.charCodeAt(0);
				const A = 'A'.charCodeAt(0);
				const n = trilha.charCodeAt(0) - A;
				trilha = String.fromCharCode(E + n);
			}
			console.log(trilha);
			this.sendMessage('turma:' + trilha);
		}
	}
}
