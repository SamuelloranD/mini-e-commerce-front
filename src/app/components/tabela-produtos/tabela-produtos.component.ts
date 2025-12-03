import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduto } from '../../interfaces/IProduto';

@Component({
  selector: 'app-tabela-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-produtos.component.html',
  styleUrls: ['./tabela-produtos.component.css']
})
export class TabelaProdutosComponent {

  @Input() produtos: IProduto[] = [];
}
