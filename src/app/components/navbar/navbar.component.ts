import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class Navbar implements OnInit, OnDestroy {
  totalItensCarrinho = 0;
  private carrinhoSubscription!: Subscription;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.atualizarContador();
    
    this.carrinhoSubscription = this.carrinhoService.carrinho$.subscribe(() => {
      this.atualizarContador();
    });
  }

  atualizarContador(): void {
    this.totalItensCarrinho = this.carrinhoService.obterTotalItens();
  }

  ngOnDestroy(): void {
    if (this.carrinhoSubscription) {
      this.carrinhoSubscription.unsubscribe();
    }
  }
}