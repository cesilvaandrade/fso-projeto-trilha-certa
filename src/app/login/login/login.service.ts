import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000'; // URL base do seu backend

  constructor(private http: HttpClient) { }

  cadastroAluno(cpf: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/cadastro/${cpf}`, {});
  }

  // Método para obter informações (ou outro endpoint que você precisar)
  getInfo(cpf: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cpf}`);
  }
}
