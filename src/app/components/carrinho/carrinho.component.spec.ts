import { CarrinhoComponent } from './carrinho.component';

describe('CarrinhoComponent', () => {
  it('deve ser criado', () => {
    const carrinhoServiceSpy = jasmine.createSpyObj('CarrinhoService', [
      'obterCarrinho', 'calcularTotal'
    ]);
    const component = new CarrinhoComponent(carrinhoServiceSpy);
    expect(component).toBeTruthy();
  });
});