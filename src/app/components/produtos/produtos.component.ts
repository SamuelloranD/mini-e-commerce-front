import { Component } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { IProduto } from '../../interfaces/IProduto';
import { CommonModule } from '@angular/common';
import { TabelaProdutosComponent } from '../tabela-produtos/tabela-produtos.component';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, TabelaProdutosComponent, FormsModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent {

  produtos: IProduto[] = []
  produtoEditando: IProduto = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    img: ''
  };

  constructor(private produtoService: ProdutosService)
  {}

  ngOnInit(): void {
    this.obterTodosProdutos();
  }

  obterTodosProdutos() {
    this.produtoService.obterTodos().subscribe({
      next: (lista) => this.produtos = lista,
      error: (erro) => console.error(erro)
    })
  }

  editarProduto(id: number) {
    const prod = this.produtos.find(p => p.id === id);
    if (!prod) return;

    this.produtoEditando = { ...prod };

    const modal = new bootstrap.Modal('#modalEditar');
    modal.show();
  }

  salvarEdicao() {
    this.produtoService.update(this.produtoEditando).subscribe({
      next: () => {

        const index = this.produtos.findIndex(p => p.id === this.produtoEditando.id);
        this.produtos[index] = { ...this.produtoEditando };

        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
        modal.hide();
      },
      error: err => console.error(err)
    });
  }

  excluirProduto(id: number) {
    this.produtoService.excluir(id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(p => p.id !== id);
        console.log("Produto excluído!");
      },
      error: (erro) => console.error(erro)
    });
  }

  // IMPLEMENTAR AMANHA
  adicionarAoCarrinho(p: IProduto) {
    console.log('Adicionar ao carrinho:', p);
  }
}
