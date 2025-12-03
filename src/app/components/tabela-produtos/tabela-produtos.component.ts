import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduto } from '../../interfaces/IProduto';

@Component({
  selector: 'app-tabela-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-produtos.component.html',
  styleUrl: './tabela-produtos.component.css'
})
export class TabelaProdutosComponent {

  @Input() produtos: IProduto[] = [];

  @Output() editar = new EventEmitter<number>();  
  @Output() excluir = new EventEmitter<number>(); 
  @Output() adicionarCarrinho = new EventEmitter<IProduto>();

  onEditar(id: number) {
    this.editar.emit(id);
  }

  onExcluir(id: number) {
    this.excluir.emit(id);
  }

  onAdicionar(produto: IProduto) {
    this.adicionarCarrinho.emit(produto);
  }
}
