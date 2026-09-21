import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProdutoCarrinho } from '../produtos';

@Component({
  selector: 'app-compra-concluida',
  templateUrl: './compra-concluida.component.html',
  styleUrls: ['./compra-concluida.component.css']
})
export class CompraConcluidaComponent implements OnInit {

  produtosComprados: IProdutoCarrinho[] = [];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const compra = sessionStorage.getItem('ultimaCompra');

    if (compra) {
      this.produtosComprados = JSON.parse(compra);
    }

  }


  continuarComprando(): void {

    this.router.navigate([
      '/produtos'
    ]);

  }


  verPedidos(): void {

    this.router.navigate([
      '/pedidos'
    ]);

  }


  valorParcela(
    produto: IProdutoCarrinho
  ): number {

    if (
      !produto.parcelas ||
      produto.parcelas <= 1
    ) {

      return produto.preco;

    }

    return produto.preco / produto.parcelas;

  }

}