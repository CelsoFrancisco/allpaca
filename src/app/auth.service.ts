import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

export interface LoginResponse {
  token: string;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/users`;

  private nomeUsuarioSubject = new BehaviorSubject<string>(
    localStorage.getItem('nomeUsuario') || 'Visitante'
  );

  nomeUsuario$ = this.nomeUsuarioSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(
    email: string,
    senha: string
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        email: email,
        senha: senha
      }
    );
  }

  atualizarUsuario(nome: string): void {

    localStorage.setItem(
      'nomeUsuario',
      nome
    );

    this.nomeUsuarioSubject.next(nome);
  }

  sair(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('nomeUsuario');

    this.nomeUsuarioSubject.next('Visitante');
  }
}