import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteCategoryAction } from './../../../../models/interfaces/categories/event/DeleteCategoryAction';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoriesService } from './../../../../services/categories/categories.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/response/GetCategoriesResponse';
import { EditCategoryAction } from 'src/app/models/interfaces/categories/event/EditCategoryAction';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: []
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {

  private ref! : DynamicDialogRef;
  private destroy$: Subject<void> = new Subject<void>();

  public categoriesData: GetCategoriesResponse[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
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

  handleDeleteCategoryAction(event: DeleteCategoryAction): void{
    if(event){
      this.confirmationService.confirm({
        message: `Deseja realmente excluir a categoria ${event.categoryName}?`,
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteCategory(event.category_id)
      })
    }
  }


  deleteCategory(category_id: string) {
    if(category_id){
      this.categoriesService.deleteCategory({category_id})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.getAllCategories();
          {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Categoria excluída com sucesso',
              life: 2000
            });

          }
        },
        error: (error) => {
          console.error('Error deleting category', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erro ao excluir categoria',
            life: 2000
          });
          this.getAllCategories();
        }
      })
    }
  }


  handleCategoryAction(event: EventAction): void{
    if(event){
      this.ref = this.dialogService.open(CategoryFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event
        }

      });

      this.ref.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.getAllCategories()

      });
    }

  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

 }


