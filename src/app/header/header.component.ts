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


  /*
   * =========================================
   * CONTROLE DO HEADER NO SCROLL
   * =========================================
   */

  headerEscondido = false;


  /*
   * Última posição do scroll.
   */
  private ultimaPosicaoScroll = 0;


  /*
   * Direção atual do scroll.
   *
   * 'baixo' = descendo
   * 'cima' = subindo
   */
  private direcaoScroll: 'baixo' | 'cima' | null = null;


  /*
   * Quantidade de pixels acumulados
   * no movimento atual.
   */
  private distanciaScroll = 0;


  /*
   * Quantos pixels precisamos rolar
   * para esconder o header.
   *
   * Aumente esse número se quiser
   * que ele fique ainda mais estável.
   */
  private readonly distanciaParaEsconder = 280;


  /*
   * Quantos pixels precisamos subir
   * para mostrar novamente.
   */
  private readonly distanciaParaMostrar = 1200;


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


    /*
     * =========================================
     * TOPO DA PÁGINA
     * =========================================
     *
     * No topo o header sempre aparece.
     */

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


      /*
       * Se mudou de direção,
       * começamos uma nova contagem.
       */

      if (this.direcaoScroll !== 'baixo') {

        this.direcaoScroll = 'baixo';

        this.distanciaScroll = 0;

      }


      /*
       * Soma a distância percorrida.
       */

      this.distanciaScroll +=
        posicaoAtual -
        this.ultimaPosicaoScroll;


      /*
       * Só esconde depois de 80px.
       */

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


      /*
       * Se mudou de direção,
       * começamos novamente.
       */

      if (this.direcaoScroll !== 'cima') {

        this.direcaoScroll = 'cima';

        this.distanciaScroll = 0;

      }


      /*
       * Soma a distância que subimos.
       */

      this.distanciaScroll +=
        this.ultimaPosicaoScroll -
        posicaoAtual;


      /*
       * Depois de subir apenas 10px,
       * o header aparece.
       */

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