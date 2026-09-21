import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduto } from '../produtos';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<IProduto[]> {
    return this.http.get<IProduto[]>(this.apiUrl);
  }

  getOne(produtoId: number): Observable<IProduto> {
    return this.http.get<IProduto>(`${this.apiUrl}/${produtoId}`);
  }
}