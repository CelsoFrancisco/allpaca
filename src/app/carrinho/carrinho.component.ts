import { Component, OnInit } from '@angular/core';

import { CarrinhoService } from './carrinho.service';

import { IProdutoCarrinho } from '../produtos';

import { Router } from '@angular/router';

import { OrderService } from '../order.service';


@Component({
  selector: 'app-carrinho',

  templateUrl: './carrinho.component.html',

  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  itensCarrinho: IProdutoCarrinho[] = [];

  total = 0;

  comprando = false;

  mostrarAvisoLogin = false;


  constructor(
    public carrinhoService: CarrinhoService,

    private router: Router,

    private orderService: OrderService
  ) {}


  ngOnInit(): void {

    this.itensCarrinho =
      this.carrinhoService.obtemCarrinho();

    this.calculaTotal();
  }


  calculaTotal(): void {

    this.total =
      this.itensCarrinho.reduce(
        (prev, curr) =>
          prev + (curr.preco * curr.quantidade),

        0
      );
  }


  removerProdutoCarrinho(
    produtosId: number
  ): void {

    this.itensCarrinho =
      this.itensCarrinho.filter(
        item => item.id !== produtosId
      );

    this.carrinhoService
      .removerProdutoCarrinho(produtosId);

    this.calculaTotal();
  }


  selecionarParcelas(
    itemCarrinho: IProdutoCarrinho,
    parcelas: number
  ): void {

    itemCarrinho.parcelas = parcelas;

    localStorage.setItem(
      'carrinho',
      JSON.stringify(this.itensCarrinho)
    );
  }


  comprar(): void {

    if (this.comprando) {
      return;
    }


    if (this.itensCarrinho.length === 0) {

      alert(
        'Seu carrinho está vazio.'
      );

      return;
    }


    const token =
      localStorage.getItem('token');


    if (!token) {

      this.mostrarAvisoLogin = true;

      return;
    }


    const quantidadeInvalida =
      this.itensCarrinho.some(
        item =>
          !item.quantidade ||
          item.quantidade <= 0
      );


    if (quantidadeInvalida) {

      alert(
        'Verifique a quantidade dos produtos no carrinho.'
      );

      return;
    }


    const parcelasInvalidas =
      this.itensCarrinho.some(
        item =>
          !item.parcelas ||
          item.parcelas <= 0
      );


    if (parcelasInvalidas) {

      alert(
        'Selecione a quantidade de parcelas para todos os produtos.'
      );

      return;
    }


    const itens =
      this.itensCarrinho.map(
        item => ({

          productId:
            item.id,

          quantity:
            item.quantidade,

          parcelas:
            item.parcelas

        })
      );


    this.comprando = true;


    this.orderService
      .criarPedido(itens)
      .subscribe({

        next: (pedido) => {

          console.log(
            'Compra realizada com sucesso:',
            pedido
          );


          sessionStorage.setItem(
            'ultimaCompra',
            JSON.stringify(
              this.itensCarrinho
            )
          );


          this.carrinhoService
            .limparCarrinho();


          this.router.navigate(
            ['/compra-concluida']
          );
        },


        error: (erro) => {

          console.error(
            'Erro ao realizar compra:',
            erro
          );


          this.comprando = false;


          if (
            erro.status === 401 ||
            erro.status === 403
          ) {

            alert(
              'Sua sessão expirou. Faça login novamente.'
            );


            localStorage.removeItem(
              'token'
            );

            localStorage.removeItem(
              'nomeUsuario'
            );


            this.router.navigate(
              ['/login']
            );

            return;
          }


          alert(
            erro.error?.erro ||
            erro.error?.message ||
            'Não foi possível realizar a compra. Tente novamente.'
          );
        }

      });
  }


  fecharAvisoLogin(): void {

    this.mostrarAvisoLogin = false;
  }


  irParaLogin(): void {

    this.mostrarAvisoLogin = false;

    this.router.navigate(
      ['/login']
    );
  }

}