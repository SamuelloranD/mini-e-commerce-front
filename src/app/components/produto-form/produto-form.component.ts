import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../../services/produtos.service';
import { IProduto } from '../../interfaces/IProduto';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {
  produtoForm!: FormGroup;
  isEditMode = false;
  produtoId?: number;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.produtoId = +id;
      this.carregarProduto(this.produtoId);
    }
  }

  inicializarFormulario(): void {
    this.produtoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      img: ['', [Validators.required]]
    });
  }

  carregarProduto(id: number): void {
    this.produtoService.obterPorId(id).subscribe({
      next: (produto) => {
        this.produtoForm.patchValue({
          name: produto.name,
          price: produto.price,
          description: produto.description,
          img: produto.img
        });
      },
      error: (erro) => {
        console.error(erro);
        this.router.navigate(['/produtos']);
      }
    });
  }

  onSubmit(): void {
    if (this.produtoForm.valid) {
      const produto: IProduto = this.produtoForm.value;

      if (this.isEditMode && this.produtoId) {
        this.produtoService.atualizar(this.produtoId, produto).subscribe({
          next: () => {
            this.router.navigate(['/produtos']);
          },
          error: (erro) => {
            console.error(erro);
          }
        });
      } else {
        this.produtoService.criar(produto).subscribe({
          next: () => {
            this.router.navigate(['/produtos']);
          },
          error: (erro) => {
            console.error(erro);
          }
        });
      }
    } else {
      Object.keys(this.produtoForm.controls).forEach(key => {
        const control = this.produtoForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/produtos']);
  }

  get name() { return this.produtoForm.get('name'); }
  get price() { return this.produtoForm.get('price'); }
  get description() { return this.produtoForm.get('description'); }
  get img() { return this.produtoForm.get('img'); }
}