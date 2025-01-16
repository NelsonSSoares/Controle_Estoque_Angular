import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoriesService } from './../../../../services/categories/categories.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/response/GetCategoriesResponse';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: []
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  public categoriesData: GetCategoriesResponse[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationioService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCategories()
  }


  getAllCategories() {
    this.categoriesService.getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: (response) => {
            if (response && Array.isArray(response)) {
              this.categoriesData = response;
            }
          },
          error: (error) => {
            console.error('Error fetching categories', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Erro ao buscar categorias',
              life: 2000
            });
            this.router.navigate(['/dashboard']);
          }
        }

      );
  }




  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

 }


