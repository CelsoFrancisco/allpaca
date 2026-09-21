import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ICadastro {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  cadastrar(dados: ICadastro): Observable<any> {

    return this.http.post<any>(
      this.apiUrl,
      dados
    );
  }
}