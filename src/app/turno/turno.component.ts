import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "../websocket.service";
import {ApiService} from "./turno.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
	selector: 'app-turno',
	templateUrl: './turno.component.html',
	styleUrls: ['./turno.component.scss']
})
export class TurnoComponent implements OnInit {
	cpf: string | null = '';
	vez: boolean = false;

	message: string = '';
	messages: string[] = [];
	private messagesSubscription: Subscription | undefined;
	private errorsSubscription: Subscription | undefined;

	matutinoVagas = 0;
	vespertinoVagas = 0;

	constructor(private apiService: ApiService, private webSocketService: WebSocketService, private router: Router, private route: ActivatedRoute) { }

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
		});

		this.errorsSubscription = this.webSocketService.getErrors().subscribe(error => {
			console.error("Websocket error in turno:", error);
			alert("Erro de coneccao (aluno nao cadastrado ou aluno ja matriculado)");
			this.router.navigate([`/login`]);
		});


		this.sendMessage('turno')
	}

	updateVagas(): void {
		this.apiService.getVagas().subscribe(
			response => {
				console.log(response);
				this.matutinoVagas = response.matutino;
				this.vespertinoVagas = response.vespertino;
			},
			error => {
				console.error('Error:', error);
				alert('Erro interno ao servidor');
			}
		);
	}

	ngOnDestroy(): void {
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
		this.router.navigate([`/trilha/${trilha}`]);
	}
}
