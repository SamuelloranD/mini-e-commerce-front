import { Routes } from '@angular/router';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { EditarProdutoComponent } from './components/editar-produto/editar-produto.component';

export const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent },
  { path: 'produtos/editar/:id', component: EditarProdutoComponent },
];
