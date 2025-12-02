import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_PATH } from '../../environment/environment';
import { IProduto } from '../interfaces/IProduto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private httpClient: HttpClient) { }

  obterTodos() {
    return this.httpClient.get<IProduto[]>(API_PATH);
  }
}
