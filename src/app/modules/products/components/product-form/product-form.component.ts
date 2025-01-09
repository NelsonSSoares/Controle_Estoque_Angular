import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/response/GetCategoriesResponse';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsServiceService } from 'src/app/services/products/products-service.service';
import { CreateProductRequest } from 'stock-api/src/models/interfaces/product/CreateProductRequest';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnInit , OnDestroy {


  private readonly destroy$: Subject<void> = new Subject();
  public selectedCategory: Array<{name: string, code: string}> = [];
  public categoriesDatas: Array<GetCategoriesResponse>  = [];
  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required]
  });

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private productService: ProductsServiceService,
    private router: Router

  ) { }


  ngOnInit(): void {
    this.getAllCategories();
  }


  getAllCategories():void {
    this.categoriesService.getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) =>{
          if(response){
            this.categoriesDatas = Array.isArray(response) ? response : [];
          }
        }
      });
  }

  handleSubmitAddProduct(): void {
    if(this.addProductForm.value && this.addProductForm.valid){
      const requestCreateProduct: CreateProductRequest = {
        name: this.addProductForm.value.name as string,
        description: this.addProductForm.value.description as string,
        price: this.addProductForm.value.price as string,
        category_id: this.addProductForm.value.category_id as string,
        amount: Number(this.addProductForm.value.amount)
      };

      this.productService.createProduct(requestCreateProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if(response){
            this.messageService.add({
              severity:'success',
              summary: 'Sucesso',
              detail: 'Produto criado com sucesso',
              life: 2000
            });

          }
        },
        error: (error) => {
          console.error(error);

          this.messageService.add({
            severity:'error',
            summary: 'Error',
            detail: 'Erro ao criar produto',
            life: 2000
          });
        },
      });
    }
    this.addProductForm.reset();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
