import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "../websocket.service";
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

  matutinoVagas = 1;
  vespertinoVagas = 0;

  constructor(private webSocketService: WebSocketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cpf = params.get('cpf')
      if(this.cpf){
        this.webSocketService.connect(this.cpf);
      }
      // Você pode usar o CPF aqui para fazer outras chamadas ou inicializar dados
    });


    this.messagesSubscription = this.webSocketService.getMessages().subscribe(message => {
      if(message == 'vez'){
        this.vez = true
        alert('Está na sua vez')
      } else if (message == 'error'){
        alert('Erro ao processar')
      }
    });

    this.errorsSubscription = this.webSocketService.getErrors().subscribe(error => {

    });

     this.sendMessage('turno')
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
    this.router.navigate([`/trilha/${this.cpf}/${trilha}`]);
  }

}
