import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IPerfil {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
}

export interface IPerfilAtualizacao {
  nome: string;
  sobrenome: string;
}

export interface IAlterarEmail {
  novoEmail: string;
  senhaAtual: string;
}

export interface IAlterarSenha {
  senhaAtual: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}

export interface ILoginResponse {
  token: string;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient
  ) {}

  buscarMeuPerfil(): Observable<IPerfil> {

    return this.http.get<IPerfil>(
      `${this.apiUrl}/me`
    );
  }

  atualizarSenha(
    dados: IAlterarSenha
  ): Observable<ILoginResponse> {

    return this.http.put<ILoginResponse>(
      `${this.apiUrl}/me/senha`,
      dados
    );
  }

  atualizarMeuPerfil(
    dados: IPerfilAtualizacao
  ): Observable<IPerfil> {

    return this.http.put<IPerfil>(
      `${this.apiUrl}/me`,
      dados
    );
  }

  atualizarEmail(
    dados: IAlterarEmail
  ): Observable<ILoginResponse> {

    return this.http.put<ILoginResponse>(
      `${this.apiUrl}/me/email`,
      dados
    );
  }
}