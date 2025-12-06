import { Routes } from '@angular/router';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';

export const routes: Routes = [
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'produtos/novo', component: ProdutoFormComponent },
  { path: 'produtos/editar/:id', component: ProdutoFormComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: '**', redirectTo: '/produtos' }
];