import { Component, OnInit } from '@angular/core';

import {
  PerfilService,
  IPerfil
} from './perfil.service';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfil: IPerfil | null = null;

  carregando = true;

  editando = false;

  nomeEditado = '';

  sobrenomeEditado = '';

  salvando = false;

  editandoEmail = false;

  novoEmail = '';

  senhaAtual = '';

  salvandoEmail = false;

  editandoSenha = false;

  novaSenha = '';

  confirmarNovaSenha = '';

  salvandoSenha = false;


  constructor(
    private perfilService: PerfilService,
    private authService: AuthService
  ) {}


  ngOnInit(): void {

    this.buscarPerfil();

  }


  buscarPerfil(): void {

    this.carregando = true;

    this.perfilService.buscarMeuPerfil().subscribe({

      next: (perfil) => {

        this.perfil = perfil;

        this.carregando = false;

      },

      error: (erro) => {

        console.error(
          'ERRO AO BUSCAR PERFIL:',
          erro
        );

        this.carregando = false;

      }

    });

  }


  iniciarEdicao(): void {

    if (!this.perfil) {

      return;

    }

    this.nomeEditado =
      this.perfil.nome;

    this.sobrenomeEditado =
      this.perfil.sobrenome;

    this.editando = true;

  }


  cancelarEdicao(): void {

    this.editando = false;

    this.nomeEditado = '';

    this.sobrenomeEditado = '';

  }


  salvarAlteracoes(): void {

    if (
      !this.nomeEditado.trim() ||
      !this.sobrenomeEditado.trim()
    ) {

      alert(
        'Nome e sobrenome precisam ser preenchidos.'
      );

      return;

    }

    this.salvando = true;

    this.perfilService.atualizarMeuPerfil({

      nome:
        this.nomeEditado.trim(),

      sobrenome:
        this.sobrenomeEditado.trim()

    }).subscribe({

      next: (perfilAtualizado) => {

        this.perfil =
          perfilAtualizado;

        this.authService.atualizarUsuario(
          perfilAtualizado.nome
        );

        this.editando = false;

        this.salvando = false;

      },

      error: (erro) => {

        console.error(
          'ERRO AO ATUALIZAR PERFIL:',
          erro
        );

        this.salvando = false;

        alert(
          erro.error?.erro ||
          'Não foi possível atualizar o perfil.'
        );

      }

    });

  }


  iniciarEdicaoEmail(): void {

    if (!this.perfil) {

      return;

    }

    this.novoEmail =
      this.perfil.email;

    this.senhaAtual = '';

    this.editandoEmail = true;

  }


  cancelarEdicaoEmail(): void {

    this.editandoEmail = false;

    this.novoEmail = '';

    this.senhaAtual = '';

  }


  salvarEmail(): void {

    if (!this.novoEmail.trim()) {

      alert(
        'Digite o novo e-mail.'
      );

      return;

    }

    if (!this.senhaAtual.trim()) {

      alert(
        'Digite sua senha atual.'
      );

      return;

    }

    this.salvandoEmail = true;

    this.perfilService.atualizarEmail({

      novoEmail:
        this.novoEmail.trim(),

      senhaAtual:
        this.senhaAtual

    }).subscribe({

      next: (resposta) => {

        localStorage.setItem(
          'token',
          resposta.token
        );

        this.authService.atualizarUsuario(
          resposta.nome
        );

        if (this.perfil) {

          this.perfil.email =
            this.novoEmail.trim();

        }

        this.editandoEmail = false;

        this.novoEmail = '';

        this.senhaAtual = '';

        this.salvandoEmail = false;

        alert(
          'E-mail alterado com sucesso!'
        );

      },

      error: (erro) => {

        console.error(
          'ERRO AO ALTERAR E-MAIL:',
          erro
        );

        this.salvandoEmail = false;

        alert(
          erro.error?.erro ||
          'Não foi possível alterar o e-mail.'
        );

      }

    });

  }


  iniciarEdicaoSenha(): void {

    this.senhaAtual = '';

    this.novaSenha = '';

    this.confirmarNovaSenha = '';

    this.editandoSenha = true;

  }


  cancelarEdicaoSenha(): void {

    this.editandoSenha = false;

    this.senhaAtual = '';

    this.novaSenha = '';

    this.confirmarNovaSenha = '';

  }


  salvarSenha(): void {

    if (!this.senhaAtual.trim()) {

      alert(
        'Digite sua senha atual.'
      );

      return;

    }

    if (!this.novaSenha.trim()) {

      alert(
        'Digite a nova senha.'
      );

      return;

    }

    if (!this.confirmarNovaSenha.trim()) {

      alert(
        'Confirme a nova senha.'
      );

      return;

    }

    if (
      this.novaSenha !==
      this.confirmarNovaSenha
    ) {

      alert(
        'A nova senha e a confirmação não são iguais.'
      );

      return;

    }

    this.salvandoSenha = true;

    this.perfilService.atualizarSenha({

      senhaAtual:
        this.senhaAtual,

      novaSenha:
        this.novaSenha,

      confirmarNovaSenha:
        this.confirmarNovaSenha

    }).subscribe({

      next: (resposta) => {

        localStorage.setItem(
          'token',
          resposta.token
        );

        this.authService.atualizarUsuario(
          resposta.nome
        );

        this.editandoSenha = false;

        this.senhaAtual = '';

        this.novaSenha = '';

        this.confirmarNovaSenha = '';

        this.salvandoSenha = false;

        alert(
          'Senha alterada com sucesso!'
        );

      },

      error: (erro) => {

        console.error(
          'ERRO AO ALTERAR SENHA:',
          erro
        );

        this.salvandoSenha = false;

        alert(
          erro.error?.erro ||
          'Não foi possível alterar a senha.'
        );

      }

    });

  }

}