import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStockMovement } from './stock-movement';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockMovementService {

  private apiUrl = `${environment.apiUrl}/stock-movements`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<IStockMovement[]> {
    return this.http.get<IStockMovement[]>(this.apiUrl);
  }
}