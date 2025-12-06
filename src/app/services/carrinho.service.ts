import { Injectable } from '@angular/core';
import { IProduto } from '../interfaces/IProduto';
import { BehaviorSubject } from 'rxjs';
import { IItemCarrinho } from '../interfaces/IITemCarrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinhoKey = 'carrinho_compras';
  private carrinhoSubject = new BehaviorSubject<IItemCarrinho[]>(this.carregarDoStorage());
  carrinho$ = this.carrinhoSubject.asObservable();

  private carregarDoStorage(): IItemCarrinho[] {
    const carrinhoSalvo = localStorage.getItem(this.carrinhoKey);
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  }

  private salvarNoStorage(carrinho: IItemCarrinho[]): void {
    localStorage.setItem(this.carrinhoKey, JSON.stringify(carrinho));
    this.carrinhoSubject.next(carrinho);
  }

  adicionarItem(produto: IProduto): void {
    if (produto.price <= 0) {
      console.error('Preço não pode ser negativo ou zero');
      return;
    }

    const carrinhoAtual = this.carregarDoStorage();
    const itemExistente = carrinhoAtual.find(item => item.produto.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinhoAtual.push({ produto, quantidade: 1 });
    }

    this.salvarNoStorage(carrinhoAtual);
  }

  removerItem(produtoId: number): void {
    let carrinhoAtual = this.carregarDoStorage();
    carrinhoAtual = carrinhoAtual.filter(item => item.produto.id !== produtoId);
    this.salvarNoStorage(carrinhoAtual);
  }

  atualizarQuantidade(produtoId: number, quantidade: number): void {
    if (quantidade <= 0) {
      this.removerItem(produtoId);
      return;
    }

    const carrinhoAtual = this.carregarDoStorage();
    const item = carrinhoAtual.find(item => item.produto.id === produtoId);
    
    if (item) {
      item.quantidade = quantidade;
      this.salvarNoStorage(carrinhoAtual);
    }
  }

  limparCarrinho(): void {
    this.salvarNoStorage([]);
  }

  obterCarrinho(): IItemCarrinho[] {
    return this.carregarDoStorage();
  }

  obterTotalItens(): number {
    const carrinho = this.carregarDoStorage();
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
  }

  calcularTotal(): number {
    const carrinho = this.carregarDoStorage();
    return carrinho.reduce((total, item) => {
      return total + (item.produto.price * item.quantidade);
    }, 0);
  }

  obterQuantidadeItem(produtoId: number): number {
    const item = this.carregarDoStorage().find(item => item.produto.id === produtoId);
    return item ? item.quantidade : 0;
  }
}