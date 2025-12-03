import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduto } from '../../interfaces/IProduto';

@Component({
  selector: 'app-produto-tabela',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto-tabela.component.html',
  styleUrls: ['./produto-tabela.component.css']
})
export class ProdutoTabelaComponent {
  @Input() produtos: IProduto[] = [];
  @Output() editar = new EventEmitter<IProduto>();
  @Output() excluir = new EventEmitter<IProduto>();
  @Output() adicionarCarrinho = new EventEmitter<IProduto>();

  formatarPreco(preco: number): string {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  }

  onEditar(produto: IProduto): void {
    this.editar.emit(produto);
  }

  onExcluir(produto: IProduto): void {
    this.excluir.emit(produto);
  }

  onAdicionarCarrinho(produto: IProduto): void {
    this.adicionarCarrinho.emit(produto);
  }
}