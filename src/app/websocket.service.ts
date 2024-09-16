import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  private messagesSubject: Subject<string> = new Subject<string>();
  private errorSubject: Subject<ErrorEvent> = new Subject<ErrorEvent>();
  private connectionPromise: Promise<void> | null = null;
  private resolveConnectionPromise: (() => void) | null = null;

  constructor() { }

  connect(cpf: string): void {
    if (this.socket) {
      this.close();  // Fechar qualquer conexão existente antes de abrir uma nova
    }

    this.socket = new WebSocket(`ws://localhost:8000/ws/matricula/${cpf}`);

    this.connectionPromise = new Promise((resolve) => {
      this.resolveConnectionPromise = resolve;
    });

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
      if (this.resolveConnectionPromise) {
        this.resolveConnectionPromise();
        this.resolveConnectionPromise = null;  // Clear resolve function
      }
    };

    this.socket.onmessage = (event) => {
      this.messagesSubject.next(event.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.errorSubject.next();
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };
  }

  async sendMessage(message: string): Promise<void> {
    if (this.socket) {
      await this.connectionPromise;  // Wait for the connection to be established
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
      } else {
        console.warn('WebSocket is not open. Message not sent.');
      }
    }
  }

  getMessages(): Observable<string> {
    return this.messagesSubject.asObservable();
  }

  getErrors(): Observable<ErrorEvent> {
    return this.errorSubject.asObservable();
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;  // Limpar a referência para evitar problemas futuros
    }
  }
}
