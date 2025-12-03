import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../services/produtos.service';
import { IProduto } from '../../interfaces/IProduto';
import { CommonModule } from '@angular/common';
import { TabelaProdutosComponent } from '../tabela-produtos/tabela-produtos.component';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarProdutoComponent } from '../editar-produto/editar-produto.component';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule,
    TabelaProdutosComponent,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit {

  produtos: IProduto[] = []


  constructor(
    private produtoService: ProdutosService,
    private dialog: MatDialog
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

  editarProduto(id: number) {
    const produtoAEditar = this.produtos.find(p => p.id === id);
    if (!produtoAEditar) return;

    const dialogRef = this.dialog.open(EditarProdutoComponent, {
      width: '600px',

      data: { ...produtoAEditar },
      panelClass: 'custom-modal'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {

        this.obterTodosProdutos();
      }
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

  adicionarAoCarrinho(p: IProduto) {
    console.log('Adicionar ao carrinho:', p);
  }
}