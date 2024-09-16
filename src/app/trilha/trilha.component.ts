import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {WebSocketService} from "../websocket.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-trilha',
  templateUrl: './trilha.component.html',
  styleUrls: ['./trilha.component.scss']
})
export class TrilhaComponent implements OnInit {

  enegreSerVagas = 5; // Replace with actual data
  dinheiroVagas = 3; // Replace with actual data
  admiravelVagas = 4; // Replace with actual data
  agroecologiaVagas = 0; // Replace with actual data

  cpf: string | null = '';
  turno: string | null = '';
  private messagesSubscription: Subscription | undefined;
  private errorsSubscription: Subscription | undefined;

  vez: boolean = false;

  matutinoVagas = 1;
  vespertinoVagas = 0;

  constructor(private webSocketService: WebSocketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cpf = params.get('cpf')
      this.turno = params.get('turno')
      if(this.cpf){
        this.webSocketService.connect(this.cpf);
      }
    });


    this.messagesSubscription = this.webSocketService.getMessages().subscribe(message => {
      alert(message)
    });

    this.errorsSubscription = this.webSocketService.getErrors().subscribe(error => {
      alert( error);
    });

    if(this.turno){
      this.sendMessage(this.turno)
    }
  }

  ngOnDestroy(): void {
    this.webSocketService.close();
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

    this.sendMessage('turma:' + trilha)

  }

}
