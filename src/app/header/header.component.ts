import {
  Component,
  HostListener,
  OnInit
} from '@angular/core';

import { Router } from '@angular/router';

import { CarrinhoService } from '../carrinho/carrinho.service';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',

  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  estaLogado = false;

  nomeUsuario = 'Visitante';


  headerEscondido = false;


  private ultimaPosicaoScroll = 0;


 
  private direcaoScroll: 'baixo' | 'cima' | null = null;



  private distanciaScroll = 0;



  private readonly distanciaParaEsconder = 280;



  private readonly distanciaParaMostrar = 1100;


  constructor(
    public carrinhoService: CarrinhoService,

    private router: Router,

    private authService: AuthService
  ) {}


  ngOnInit(): void {

    this.verificarLogin();


    this.authService.nomeUsuario$.subscribe(
      nome => {

        this.nomeUsuario = nome;

        this.estaLogado =
          nome !== 'Visitante';

      }
    );

  }


  /*
   * =========================================
   * CONTROLE DO SCROLL
   * =========================================
   */

  @HostListener('window:scroll', [])
  onScroll(): void {

    const posicaoAtual =
      window.scrollY;


 

    if (posicaoAtual <= 0) {

      this.headerEscondido = false;

      this.ultimaPosicaoScroll = 0;

      this.direcaoScroll = null;

      this.distanciaScroll = 0;

      return;
    }


    /*
     * =========================================
     * DESCOBRIR A DIREÇÃO
     * =========================================
     */

    const rolandoParaBaixo =
      posicaoAtual >
      this.ultimaPosicaoScroll;


    const rolandoParaCima =
      posicaoAtual <
      this.ultimaPosicaoScroll;


    /*
     * =========================================
     * ROLANDO PARA BAIXO
     * =========================================
     */

    if (rolandoParaBaixo) {


    

      if (this.direcaoScroll !== 'baixo') {

        this.direcaoScroll = 'baixo';

        this.distanciaScroll = 0;

      }


     

      this.distanciaScroll +=
        posicaoAtual -
        this.ultimaPosicaoScroll;


 

      if (
        this.distanciaScroll >=
        this.distanciaParaEsconder
      ) {

        this.headerEscondido = true;

      }

    }


    /*
     * =========================================
     * ROLANDO PARA CIMA
     * =========================================
     */

    else if (rolandoParaCima) {


    

      if (this.direcaoScroll !== 'cima') {

        this.direcaoScroll = 'cima';

        this.distanciaScroll = 0;

      }


    

      this.distanciaScroll +=
        this.ultimaPosicaoScroll -
        posicaoAtual;




      if (
        this.distanciaScroll >=
        this.distanciaParaMostrar
      ) {

        this.headerEscondido = false;

      }

    }


    /*
     * =========================================
     * ATUALIZA A POSIÇÃO
     * =========================================
     */

    this.ultimaPosicaoScroll =
      posicaoAtual;

  }


  /*
   * =========================================
   * QUANTIDADE TOTAL DO CARRINHO
   * =========================================
   */

  get quantidadeCarrinho(): number {

    const carrinho =
      this.carrinhoService.obtemCarrinho();


    return carrinho.reduce(
      (total, produto) =>
        total + produto.quantidade,

      0
    );

  }


  /*
   * =========================================
   * VERIFICAR LOGIN
   * =========================================
   */

  verificarLogin(): void {

    const token =
      localStorage.getItem('token');


    this.estaLogado =
      !!token;


    const nome =
      localStorage.getItem('nomeUsuario');


    if (
      this.estaLogado &&
      nome
    ) {

      this.nomeUsuario =
        nome;

    } else {

      this.nomeUsuario =
        'Visitante';

    }

  }


  /*
   * =========================================
   * SAIR
   * =========================================
   */

  sair(): void {

    this.authService.sair();


    this.estaLogado = false;


    this.nomeUsuario =
      'Visitante';


    this.router.navigate(
      ['/login']
    );

  }

}