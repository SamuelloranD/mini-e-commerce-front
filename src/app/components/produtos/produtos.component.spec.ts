import { ProdutosComponent } from './produtos.component';
import { ProdutosService } from '../../services/produtos.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ProdutosComponent', () => {
  let component: ProdutosComponent;
  let produtosServiceSpy: jasmine.SpyObj<ProdutosService>;
  let carrinhoServiceSpy: jasmine.SpyObj<CarrinhoService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProduto = {
    id: 1,
    name: 'Produto',
    price: 100,
    description: 'Teste',
    img: 'teste.jpg'
  };

  beforeEach(() => {
    produtosServiceSpy = jasmine.createSpyObj('ProdutosService', ['obterTodos', 'excluir']);
    carrinhoServiceSpy = jasmine.createSpyObj('CarrinhoService', ['adicionarItem']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    produtosServiceSpy.obterTodos.and.returnValue(of([mockProduto]));
    
    component = new ProdutosComponent(
      produtosServiceSpy,
      routerSpy,
      carrinhoServiceSpy
    );
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar produtos vazios', () => {
    expect(component.produtos).toEqual([]);
  });

  it('ngOnInit deve carregar produtos', () => {
    component.ngOnInit();
    expect(produtosServiceSpy.obterTodos).toHaveBeenCalled();
  });

  it('onAdicionarCarrinho deve adicionar ao carrinho', () => {
    component.onAdicionarCarrinho(mockProduto);
    expect(carrinhoServiceSpy.adicionarItem).toHaveBeenCalledWith(mockProduto);
  });

  it('onEditar deve navegar para edição', () => {
    component.onEditar(mockProduto);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/produtos/editar', 1]);
  });

  it('onExcluir deve excluir quando confirmado', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    produtosServiceSpy.excluir.and.returnValue(of({}));
    
    component.onExcluir(mockProduto);
    expect(produtosServiceSpy.excluir).toHaveBeenCalledWith(1);
  });


  it('deve lidar com erro ao carregar produtos', () => {
    produtosServiceSpy.obterTodos.and.returnValue(throwError(() => new Error('Erro')));
    spyOn(console, 'error');
    
    component.ngOnInit();
    expect(console.error).toHaveBeenCalled();
  });
});