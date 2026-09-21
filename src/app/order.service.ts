import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../environments/environment';


export interface IOrderItemRequest {

  productId: number;

  quantity: number;

  parcelas: number;

}


export interface IOrderRequest {

  items: IOrderItemRequest[];

}


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly API =
    `${environment.apiUrl}/orders`;


  constructor(
    private http: HttpClient
  ) {}


  criarPedido(
    itens: IOrderItemRequest[]
  ): Observable<any> {

    const pedido: IOrderRequest = {

      items: itens

    };


    return this.http.post<any>(
      this.API,
      pedido
    );

  }

}