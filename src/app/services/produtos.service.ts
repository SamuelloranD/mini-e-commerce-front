import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../environment/environment';
import { IProduto } from '../interfaces/IProduto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private apiUrl = API_PATH;

  constructor(private httpClient: HttpClient) { }

  obterTodos(): Observable<IProduto[]> {
    return this.httpClient.get<IProduto[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<IProduto> {
    return this.httpClient.get<IProduto>(`${this.apiUrl}/${id}`);
  }

  criar(produto: IProduto): Observable<IProduto> {
    return this.httpClient.post<IProduto>(this.apiUrl, produto);
  }

  atualizar(id: number, produto: IProduto): Observable<IProduto> {
    return this.httpClient.put<IProduto>(`${this.apiUrl}/${id}`, produto);
  }

  excluir(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}