import { ProdutosService } from './produtos.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ProdutosService', () => {
  let service: ProdutosService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const mockProduto = {
    id: 1,
    name: 'Produto Teste',
    price: 100,
    description: 'Teste',
    img: 'teste.jpg'
  };

  const mockProdutos = [mockProduto];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get', 'post', 'put', 'delete'
    ]);
    
    service = new ProdutosService(httpClientSpy);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('obterTodos: deve fazer GET e retornar Observable', (done) => {
    httpClientSpy.get.and.returnValue(of(mockProdutos));
    
    service.obterTodos().subscribe(produtos => {
      expect(produtos).toEqual(mockProdutos);
      expect(httpClientSpy.get).toHaveBeenCalled();
      done();
    });
  });

  it('obterPorId: deve fazer GET com id', (done) => {
    httpClientSpy.get.and.returnValue(of(mockProduto));
    
    service.obterPorId(1).subscribe(produto => {
      expect(produto).toEqual(mockProduto);
      expect(httpClientSpy.get).toHaveBeenCalled();
      done();
    });
  });

  it('criar: deve fazer POST', (done) => {
    httpClientSpy.post.and.returnValue(of(mockProduto));
    
    service.criar(mockProduto).subscribe(produto => {
      expect(produto).toEqual(mockProduto);
      expect(httpClientSpy.post).toHaveBeenCalled();
      done();
    });
  });

  it('atualizar: deve fazer PUT com id', (done) => {
    httpClientSpy.put.and.returnValue(of(mockProduto));
    
    service.atualizar(1, mockProduto).subscribe(produto => {
      expect(produto).toEqual(mockProduto);
      expect(httpClientSpy.put).toHaveBeenCalled();
      done();
    });
  });

  it('excluir: deve fazer DELETE', (done) => {
    httpClientSpy.delete.and.returnValue(of({}));
    
    service.excluir(1).subscribe(response => {
      expect(response).toEqual({});
      expect(httpClientSpy.delete).toHaveBeenCalled();
      done();
    });
  });

  it('deve lidar com erro em obterTodos', (done) => {
    httpClientSpy.get.and.returnValue(throwError(() => new Error('Erro')));
    
    service.obterTodos().subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        done();
      }
    });
  });

  it('deve lidar com erro em obterPorId', (done) => {
    httpClientSpy.get.and.returnValue(throwError(() => new Error('Erro')));
    
    service.obterPorId(1).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
        done();
      }
    });
  });
});