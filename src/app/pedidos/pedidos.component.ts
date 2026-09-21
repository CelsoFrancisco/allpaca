import {
  Component,
  OnInit
} from '@angular/core';

import {
  PedidoService,
  IOrder
} from './pedido.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos: IOrder[] = [];

  carregando = true;

  erro = '';


  constructor(
    private pedidoService: PedidoService
  ) {}


  ngOnInit(): void {

    this.buscarPedidos();

  }


  buscarPedidos(): void {

    this.carregando = true;

    this.erro = '';


    this.pedidoService.buscarPedidos().subscribe({

      next: (pedidos: IOrder[]) => {

        this.pedidos = pedidos;

        this.carregando = false;

      },


      error: (erro: any) => {

        console.error(
          'Erro ao buscar pedidos:',
          erro
        );

        this.erro =
          'Não foi possível carregar seus pedidos.';

        this.carregando = false;

      }

    });

  }


  calcularTotal(pedido: IOrder): number {

    return pedido.items.reduce(
      (total, item) =>
        total + (item.price * item.quantity),
      0
    );

  }

}