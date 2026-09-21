import {
  Component
} from '@angular/core';

import {
  AuthService
} from '../auth.service';

import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';

  senha = '';

  mostrarSenha = false;

  mensagemErro = '';

  formularioEnviado = false;

  carregando = false;


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  alternarSenha(): void {

    this.mostrarSenha =
      !this.mostrarSenha;

  }


  emailValido(): boolean {

    const email =
      this.email.trim();

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );

  }


  login(): void {

    

    if (this.carregando) {

      return;

    }


    this.formularioEnviado = true;

    this.mensagemErro = '';


    /* =====================================
       VALIDAÇÃO DO E-MAIL
       ===================================== */

    if (!this.email.trim()) {

      this.mensagemErro =
        'Digite seu e-mail.';

      return;

    }


    if (!this.emailValido()) {

      this.mensagemErro =
        'Digite um e-mail válido.';

      return;

    }


    /* =====================================
       VALIDAÇÃO DA SENHA
       ===================================== */

    if (!this.senha) {

      this.mensagemErro =
        'Digite sua senha.';

      return;

    }


    if (this.senha.length < 8) {

      this.mensagemErro =
        'A senha deve ter pelo menos 8 caracteres.';

      return;

    }


    /* =====================================
       LOGIN
       ===================================== */

    this.carregando = true;


    this.authService.login(
      this.email.trim(),
      this.senha
    ).subscribe({

      next: (resposta) => {

        this.carregando = false;


        
        localStorage.setItem(
          'token',
          resposta.token
        );



        this.authService.atualizarUsuario(
          resposta.nome
        );



        this.router.navigate(
          ['/produtos']
        );

      },


      error: (erro: any) => {

        this.carregando = false;


       
        this.mensagemErro =
          erro.error?.erro ||
          'Erro ao realizar login.';

      }

    });

  }


  irParaCadastro(): void {

    this.router.navigate(
      ['/cadastro']
    );

  }

}