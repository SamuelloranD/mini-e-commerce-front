import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./editar-produto.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditarProdutoComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ProdutosService,
    public dialogRef: MatDialogRef<EditarProdutoComponent>,
    @Inject(MAT_DIALOG_DATA) public produto: IProduto
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.produto.name, Validators.required],
      price: [this.produto.price, Validators.required],
      description: [this.produto.description],
      img: [this.produto.img]
    });
  }

salvar() {
    if (this.form.invalid) {
      return;
    }

    const atualizado: IProduto = {
      ...this.produto,
      ...this.form.value
    };
    this.service.update(atualizado).subscribe({
        next: () => {
            console.log('✅ Produto atualizado com sucesso na API.');
            this.dialogRef.close(true);
        },
        error: (err) => {
            console.error('❌ ERRO ao salvar produto na API:', err);
            this.dialogRef.close(false);
        }
    });
  }
}