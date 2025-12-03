import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../environment/environment';
import { IProduto } from '../interfaces/IProduto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private httpClient: HttpClient) { }

  obterTodos() {
    return this.httpClient.get<IProduto[]>(API_PATH);
  }

  excluir(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${API_PATH}/${id}`);
  }

  update(produto: IProduto) {
    return this.httpClient.put(`${API_PATH}/${produto.id}`, produto);
  }

}
