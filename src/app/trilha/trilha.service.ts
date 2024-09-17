import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000'; // URL base do seu backend

  constructor(private http: HttpClient) { }
  getVagasMatutino(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/vagas/matutino`, {});
  }
  getVagasVespertino(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/vagas/vespertino`, {});
  }
}
