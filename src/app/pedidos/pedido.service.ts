import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../../environments/environment';


export interface IOrderItem {

  productName: string;

  imagem: string;

  quantity: number;

  price: number;

  parcelas: number;

}


export interface IOrder {

  id: number;

  date: string;

  items: IOrderItem[];

}


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly API =
    `${environment.apiUrl}/orders`;


  constructor(
    private http: HttpClient
  ) {}


  buscarPedidos(): Observable<IOrder[]> {

    return this.http.get<IOrder[]>(
      this.API
    );

  }

}