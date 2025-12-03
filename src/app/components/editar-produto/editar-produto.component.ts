import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduto } from '../../interfaces/IProduto';

import { ProdutosService } from '../../services/produtos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ProdutosService,
    private dialogRef: MatDialogRef<EditarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public produto: IProduto
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [this.produto.name, Validators.required],
      preco: [this.produto.price, Validators.required],
      descricao: [this.produto.description],
      imagem: [this.produto.img]
    });
  }

  salvar() {
    const atualizado: IProduto = {
      ...this.produto,
      ...this.form.value
    };

    this.service.update(atualizado).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
