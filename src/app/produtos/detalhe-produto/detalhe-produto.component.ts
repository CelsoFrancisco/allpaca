import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho/carrinho.service';
import { NotificacaoService } from 'src/app/notificao.service';
import { IProduto, IProdutoCarrinho } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos/produtos.service';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {

  produto: IProduto | undefined;

  quantidade = 1;

  parcelasSelecionadas = 1;

  opcoesParcelamento = [1, 2, 3, 6, 12];

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const produtoId = Number(params.get('id'));

      this.produtosService.getOne(produtoId).subscribe(produto => {

        this.produto = produto;

      });

    });

  }


  adicionarAoCarrinho(): void {

    if (!this.produto) {
      return;
    }

    const estoque = this.produto.quantidadeEstoque ?? 0;

    if (estoque <= 0) {

      this.notificacaoService.notificar(
        'Produto sem estoque.'
      );

      return;
    }

    if (this.quantidade < 1) {
      this.quantidade = 1;
    }

    if (this.quantidade > estoque) {

      this.quantidade = estoque;

      this.notificacaoService.notificar(
        'Quantidade maior que o estoque disponível.'
      );

      return;
    }

    const produto: IProdutoCarrinho = {

      ...this.produto,

      quantidade: this.quantidade,

      parcelas: this.parcelasSelecionadas

    };

    this.carrinhoService.adicionarAoCarrinho(produto);

    this.notificacaoService.notificar(
      'O produto foi adicionado ao carrinho.'
    );

  }


  diminuirQuantidade(): void {

    if (this.quantidade > 1) {
      this.quantidade--;
    }

  }


  aumentarQuantidade(): void {

    const estoque = this.produto?.quantidadeEstoque ?? 0;

    if (this.quantidade < estoque) {
      this.quantidade++;
    }

  }


  alterarQuantidade(): void {

    const estoque = this.produto?.quantidadeEstoque ?? 0;

    if (this.quantidade < 1) {
      this.quantidade = 1;
    }

    if (estoque > 0 && this.quantidade > estoque) {
      this.quantidade = estoque;
    }

  }


  selecionarParcelas(parcelas: number): void {

    this.parcelasSelecionadas = parcelas;

  }


  valorParcela(parcelas: number): number {

    const preco = this.produto?.preco ?? 0;

    if (parcelas <= 0) {
      return preco;
    }

    return preco / parcelas;

  }


  get percentualEstoque(): number {

    const estoque = this.produto?.quantidadeEstoque ?? 0;

    if (estoque <= 0) {
      return 0;
    }

    const percentual = estoque * 5;

    return percentual > 100
      ? 100
      : percentual;

  }

}