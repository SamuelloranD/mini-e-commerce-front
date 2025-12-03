import { Component } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { IProduto } from '../../interfaces/IProduto';
import { CommonModule } from '@angular/common';
import { TabelaProdutosComponent } from '../tabela-produtos/tabela-produtos.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, TabelaProdutosComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  produtos: IProduto[] = []

  constructor(private produtoService: ProdutosService)
  {}

  ngOnInit(): void {
    this.obterTodosCarros();
  }

  obterTodosCarros() {
    this.produtoService.obterTodos().subscribe({
      next: (lista) => this.produtos = lista,
      error: (erro) => console.error(erro)
    })
  }
}
