import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CompraConcluidaComponent } from './compra-concluida/compra-concluida.component';


const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
  path: 'cadastro',
  component: CadastroComponent
  },

  {
    path: 'produtos',
    loadChildren: () =>
      import('./produtos/produtos.module').then(m => m.ProdutosModule)
  },

  {
    path: 'pedidos',
    component: PedidosComponent,
    canActivate: [AuthGuard]
  },
  { 
  path: 'compra-concluida', 
  component: CompraConcluidaComponent 
},

  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  },

  {
    path: 'carrinho',
    loadChildren: () =>
      import('./carrinho/carrinho.module').then(m => m.CarrinhoModule)
  },

  {
    path: 'contato',
    loadChildren: () =>
      import('./contato/contato.module').then(m => m.ContatoModule)
  },

  {
    path: '**',
    component: NaoEncontradoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }