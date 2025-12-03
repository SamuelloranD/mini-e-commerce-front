import { Component } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { IProduto } from '../../interfaces/IProduto';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProdutoTabelaComponent } from '../produto-tabela/produto-tabela.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, ProdutoTabelaComponent, RouterModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {
  produtos: IProduto[] = []

  constructor(
    private produtoService: ProdutosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obterTodosProdutos();
  }

  obterTodosProdutos() {
    this.produtoService.obterTodos().subscribe({
      next: (lista) => this.produtos = lista,
      error: (erro) => console.error(erro)
    })
  }

  onEditar(produto: IProduto): void {
    this.router.navigate(['/produtos/editar', produto.id]);
  }

  onExcluir(produto: IProduto): void {
    this.produtoService.excluir(produto.id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(p => p.id !== produto.id);
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }

  onAdicionarCarrinho(produto: IProduto): void {
    console.log('Adicionar ao carrinho:', produto);
  }
}