import { CarrinhoService } from './carrinho.service';
import { IProduto } from '../interfaces/IProduto';

describe('CarrinhoService', () => {
  let service: CarrinhoService;
  
  const mockProduto1: IProduto = {
    id: 1,
    name: 'Produto 1',
    price: 100,
    description: 'Desc 1',
    img: 'img1.jpg'
  };

  const mockProduto2: IProduto = {
    id: 2,
    name: 'Produto 2',
    price: 200,
    description: 'Desc 2',
    img: 'img2.jpg'
  };

  beforeEach(() => {
    let store: { [key: string]: string } = {};
    const mockLocalStorage = {
      getItem: (key: string): string | null => store[key] || null,
      setItem: (key: string, value: string): void => { store[key] = value; },
      clear: (): void => { store = {}; },
      removeItem: (key: string): void => { delete store[key]; }
    };
    
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true
    });
    
    mockLocalStorage.clear();
    service = new CarrinhoService();
  });


  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve ter observable carrinho$', () => {
    expect(service.carrinho$).toBeDefined();
  });

  it('adicionarItem: deve adicionar novo produto', () => {
    service.adicionarItem(mockProduto1);
    const carrinho = service.obterCarrinho();
    expect(carrinho.length).toBe(1);
    expect(carrinho[0].produto.id).toBe(1);
    expect(carrinho[0].quantidade).toBe(1);
  });

  it('adicionarItem: deve incrementar quantidade se produto já existe', () => {
    service.adicionarItem(mockProduto1);
    service.adicionarItem(mockProduto1);
    const carrinho = service.obterCarrinho();
    expect(carrinho[0].quantidade).toBe(2);
  });

  it('adicionarItem: não deve adicionar produto com preço <= 0', () => {
    spyOn(console, 'error');
    const produtoInvalido = { ...mockProduto1, price: -10 };
    service.adicionarItem(produtoInvalido);
    expect(service.obterCarrinho().length).toBe(0);
    expect(console.error).toHaveBeenCalled();
  });

  it('removerItem: deve remover produto específico', () => {
    service.adicionarItem(mockProduto1);
    service.adicionarItem(mockProduto2);
    service.removerItem(1);
    expect(service.obterCarrinho().length).toBe(1);
    expect(service.obterCarrinho()[0].produto.id).toBe(2);
  });

  it('atualizarQuantidade: deve atualizar quantidade', () => {
    service.adicionarItem(mockProduto1);
    service.atualizarQuantidade(1, 5);
    expect(service.obterQuantidadeItem(1)).toBe(5);
  });

  it('atualizarQuantidade: deve remover se quantidade <= 0', () => {
    service.adicionarItem(mockProduto1);
    service.atualizarQuantidade(1, 0);
    expect(service.obterCarrinho().length).toBe(0);
  });

  it('limparCarrinho: deve esvaziar carrinho', () => {
    service.adicionarItem(mockProduto1);
    service.adicionarItem(mockProduto2);
    service.limparCarrinho();
    expect(service.obterCarrinho().length).toBe(0);
  });

  it('obterCarrinho: deve retornar array de itens', () => {
    service.adicionarItem(mockProduto1);
    const carrinho = service.obterCarrinho();
    expect(Array.isArray(carrinho)).toBeTrue();
  });

  it('obterTotalItens: deve calcular total de itens', () => {
    service.adicionarItem(mockProduto1);
    service.adicionarItem(mockProduto1);
    service.adicionarItem(mockProduto2);
    expect(service.obterTotalItens()).toBe(3);
  });

  it('calcularTotal: deve calcular valor total', () => {
    service.adicionarItem(mockProduto1);
    service.adicionarItem(mockProduto1);
    service.adicionarItem(mockProduto2);
    expect(service.calcularTotal()).toBe(400);
  });

  it('obterQuantidadeItem: deve retornar quantidade específica', () => {
    service.adicionarItem(mockProduto1);
    service.adicionarItem(mockProduto1);
    expect(service.obterQuantidadeItem(1)).toBe(2);
  });

  it('obterQuantidadeItem: deve retornar 0 para produto inexistente', () => {
    expect(service.obterQuantidadeItem(999)).toBe(0);
  });

  it('deve emitir evento no carrinho$ ao modificar', (done) => {
    let emissions = 0;
    const subscription = service.carrinho$.subscribe(() => {
      emissions++;
      if (emissions === 2) {
        expect(emissions).toBe(2);
        subscription.unsubscribe();
        done();
      }
    });
    
    service.adicionarItem(mockProduto1);
  });

  it('deve persistir dados no localStorage', () => {
    service.adicionarItem(mockProduto1);
    const dados = localStorage.getItem('carrinho_compras');
    expect(dados).toBeTruthy();
    expect(JSON.parse(dados!)[0].produto.id).toBe(1);
  });

  it('deve carregar dados do localStorage ao iniciar', () => {
    service.adicionarItem(mockProduto1);
    service.adicionarItem(mockProduto1);
    
    const novoService = new CarrinhoService();
    expect(novoService.obterCarrinho().length).toBe(1);
    expect(novoService.obterQuantidadeItem(1)).toBe(2);
  });

  it('deve lidar com localStorage vazio', () => {
    localStorage.clear();
    const novoService = new CarrinhoService();
    expect(novoService.obterCarrinho()).toEqual([]);
  });
});