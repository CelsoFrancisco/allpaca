import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

import {
  ProdutosService
} from './produtos.service';

import {
  IProduto,
  IProdutoCarrinho
} from '../produtos';

import {
  CarrinhoService
} from '../carrinho/carrinho.service';


@Component({
  selector: 'app-produtos',

  templateUrl:
    './produtos.component.html',

  styleUrls:
    ['./produtos.component.css']
})
export class ProdutosComponent
  implements OnInit, AfterViewInit {


  /* =========================================
     PRODUTOS
     ========================================= */

  produtos: IProduto[] = [];


  /* =========================================
     REFERÊNCIA DOS CARDS
     ========================================= */

  @ViewChildren(
    'productCard',
    {
      read: ElementRef
    }
  )
  productCards!: QueryList<ElementRef>;


  /* =========================================
     CONSTRUTOR
     ========================================= */

  constructor(

    private produtoService: ProdutosService,

    private route: ActivatedRoute,

    private carrinhoService: CarrinhoService,

    private router: Router,

    private snackBar: MatSnackBar

  ) {}


  /* =========================================
     INICIALIZAÇÃO
     ========================================= */

  ngOnInit(): void {

    this.produtoService.getAll().subscribe({

next: produtos => {

    this.route.queryParamMap.subscribe(params => {

        const descricao =
            params.get('descricao')?.toLowerCase();

        if (descricao) {

            this.produtos = produtos.filter(
                produto =>
                    produto.descricao
                        .toLowerCase()
                        .includes(descricao)
            );

            return;
        }

        this.produtos = produtos;

    });

},


      error: erro => {

        console.error(
          'ERRO AO BUSCAR PRODUTOS:',
          erro
        );

      }

    });

  }


  /* =========================================
     ANIMAÇÃO DOS CARDS
     ========================================= */

  ngAfterViewInit(): void {

  

    const observer =
      new IntersectionObserver(

        entries => {

          entries.forEach(
            entry => {

              const element =
                entry.target as HTMLElement;


             

              if (entry.isIntersecting) {

               

                const index =
                  Array
                    .from(this.productCards)
                    .findIndex(
                      card =>
                        card.nativeElement
                        === element
                    );


              

                const delay =
                  (index % 4) * 80;


                element.style.transitionDelay =
                  `${delay}ms`;


                element.classList.add(
                  'is-visible'
                );

              }


            

              else {

                element.classList.remove(
                  'is-visible'
                );


                element.style.transitionDelay =
                  '0ms';

              }

            }
          );

        },

        {
         

          threshold: 0.15

        }

      );


   

    this.productCards.forEach(
      card => {

        observer.observe(
          card.nativeElement
        );

      }
    );



    this.productCards.changes.subscribe(
      () => {

        this.productCards.forEach(
          card => {

            observer.observe(
              card.nativeElement
            );

          }
        );

      }
    );

  }


  /* =========================================
     ADICIONAR AO CARRINHO
     ========================================= */

  adicionarAoCarrinho(
    produto: IProduto
  ): void {

    const produtoCarrinho:
      IProdutoCarrinho = {

        ...produto,

        quantidade: 1,
        parcelas: 1

      };


    this.carrinhoService
      .adicionarAoCarrinho(
        produtoCarrinho
      );


    this.snackBar.open(

      `${produto.descricao} foi adicionado ao carrinho!`,

      'Fechar',

      {

        duration: 3000,

        horizontalPosition:
          'center',

        verticalPosition:
          'bottom'

      }

    );

  }


  /* =========================================
     COMPRAR AGORA
     ========================================= */

  comprarAgora(
    produto: IProduto
  ): void {

    const produtoCarrinho:
      IProdutoCarrinho = {

        ...produto,

        quantidade: 1,
        parcelas: 1

      };


    this.carrinhoService
      .adicionarAoCarrinho(
        produtoCarrinho
      );


    this.router.navigate(
      ['/carrinho']
    );

  }

}