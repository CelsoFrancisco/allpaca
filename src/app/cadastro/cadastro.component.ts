import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  nome = '';
  sobrenome = '';
  email = '';
  senha = '';
  confirmarSenha = '';

  mensagemErro = '';
  mensagemSucesso = '';

  carregando = false;

  formularioEnviado = false;

  constructor(
    private cadastroService: CadastroService,
    private router: Router
  ) {}

  emailValido(): boolean {

    const email = this.email.trim();

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  nomeValido(nome: string): boolean {

    const valor = nome.trim();

    return /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/.test(valor);
  }

  cadastrar(): void {

    if (this.carregando) {
      return;
    }

    this.formularioEnviado = true;

    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.nome.trim()) {

      this.mensagemErro =
        'Digite seu nome.';

      return;
    }

    if (!this.nomeValido(this.nome)) {

      this.mensagemErro =
        'O nome deve conter apenas letras, sem acentos, números ou símbolos.';

      return;
    }

    if (!this.sobrenome.trim()) {

      this.mensagemErro =
        'Digite seu sobrenome.';

      return;
    }

    if (!this.nomeValido(this.sobrenome)) {

      this.mensagemErro =
        'O sobrenome deve conter apenas letras, sem acentos, números ou símbolos.';

      return;
    }

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

    if (!this.confirmarSenha) {

      this.mensagemErro =
        'Confirme sua senha.';

      return;
    }

    if (this.senha !== this.confirmarSenha) {

      this.mensagemErro =
        'A senha e a confirmação não são iguais.';

      return;
    }

    const dados = {

      nome: this.nome.trim(),

      sobrenome: this.sobrenome.trim(),

      email: this.email.trim(),

      senha: this.senha

    };

    this.carregando = true;

    this.cadastroService.cadastrar(dados).subscribe({

      next: () => {

        this.carregando = false;

        this.nome = '';
        this.sobrenome = '';
        this.email = '';
        this.senha = '';
        this.confirmarSenha = '';

        this.formularioEnviado = false;

        this.mensagemSucesso =
          'Conta criada com sucesso!';

        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 1500);

      },

      error: (erro) => {

        this.carregando = false;

        console.error(
          'Erro ao criar conta:',
          erro
        );

        this.mensagemErro =
          erro.error?.erro ||
          'Não foi possível criar a conta.';

      }

    });
  }
}