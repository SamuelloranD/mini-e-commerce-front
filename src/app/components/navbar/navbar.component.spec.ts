import { Navbar } from './navbar.component';

describe('Navbar', () => {
  it('deve ser criado', () => {
    const carrinhoServiceSpy = jasmine.createSpyObj('CarrinhoService', ['obterTotalItens']);
    const component = new Navbar(carrinhoServiceSpy);
    expect(component).toBeTruthy();
  });
});