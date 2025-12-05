import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { IItemCarrinho } from '../../interfaces/IITemCarrinho';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IItemCarrinho[] = [];
  total = 0;
  totalItens = 0;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carregarCarrinho();
    
    this.carrinhoService.carrinho$.subscribe(() => {
      this.carregarCarrinho();
    });
  }

  carregarCarrinho(): void {
    this.itensCarrinho = this.carrinhoService.obterCarrinho();
    this.total = this.carrinhoService.calcularTotal();
    this.calcularTotalItens();
  }

  calcularTotalItens(): void {
    this.totalItens = this.itensCarrinho.reduce((total, item) => total + item.quantidade, 0);
  }

  removerItem(produtoId: number): void {
    this.carrinhoService.removerItem(produtoId);
  }

  atualizarQuantidade(produtoId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantidade = parseInt(input.value);
    
    if (isNaN(quantidade) || quantidade <= 0) {
      this.removerItem(produtoId);
      return;
    }
    
    this.carrinhoService.atualizarQuantidade(produtoId, quantidade);
  }

  incrementarQuantidade(produtoId: number, quantidadeAtual: number): void {
    this.carrinhoService.atualizarQuantidade(produtoId, quantidadeAtual + 1);
  }

  decrementarQuantidade(produtoId: number, quantidadeAtual: number): void {
    if (quantidadeAtual > 1) {
      this.carrinhoService.atualizarQuantidade(produtoId, quantidadeAtual - 1);
    }
  }

  limparCarrinho(): void {
    if (confirm('Deseja esvaziar todo o carrinho?')) {
      this.carrinhoService.limparCarrinho();
    }
  }

  formatarPreco(preco: number): string {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
  }

  calcularSubtotal(item: IItemCarrinho): number {
    return item.produto.price * item.quantidade;
  }
}