import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/response/GetCategoriesResponse';
import { CategoriesService } from 'src/app/services/categories/categories.service';

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
    throw new Error('Method not implemented.');
    }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
