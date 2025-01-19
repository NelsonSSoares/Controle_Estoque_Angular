import { CategoryEvent } from 'src/app/models/enums/category/CategoryEvent';

import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EditCategoryAction } from 'src/app/models/interfaces/categories/event/EditCategoryAction';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: []
})
export class CategoryFormComponent implements OnInit,OnDestroy{

  private readonly destroy$: Subject<void> = new Subject<void>();

  public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;

  public categoryAction!: {event: EditCategoryAction};
  public categoryForm = this.formBuilder.group({
    name: ['',Validators.required],
  });

  constructor(
    private ref: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {

  }

  handleSubmitAddCategory(): void{
    if(this.categoryForm?.value && this.categoryForm?.valid){

      const requestCreateCategory: {name: string} = {
        name: this.categoryForm?.value.name as string
      }
      this.categoriesService.createNewCategory(requestCreateCategory)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity:'success',
            summary: 'Success',
            detail: 'Categoria criada com sucesso',
            life: 3000
          });

        },
        error: (error) => {
          this.categoryForm.reset();
          console.log(error);

          this.messageService.add({
            severity:'error',
            summary: 'Error',
            detail: 'Erro ao criar categoria',
            life: 3000
          });
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
