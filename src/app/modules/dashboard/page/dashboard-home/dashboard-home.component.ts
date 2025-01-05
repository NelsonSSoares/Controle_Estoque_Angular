import { MessageService } from 'primeng/api';
import { ProductsServiceService } from './../../../../services/products/products-service.service';
import { Component, OnDestroy } from '@angular/core';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsDataTransferService } from 'src/app/shared/services/products-data-transfer.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnDestroy{

  public productsList: Array<GetAllProductsResponse> = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private productsService: ProductsServiceService,
    private messageService: MessageService, // PRIMENG TOAST, FAZ A SNACKBAR DE NOTIFICAÇÃO
    private productsDataTransferService: ProductsDataTransferService
  ) { }


  ngOnInit(): void {
    this.getAllProductsDatas();

  }

  getAllProductsDatas(): void {
    this.productsService.getAllProducts()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {

          if (response.length > 0) {
            this.productsList = response;
            this.productsDataTransferService.setProductsData(this.productsList);

          }
        },
        error: (error) => {
          console.log(error);

          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao buscar produtos',
            detail: 'Tente novamente mais tarde',
            life: 2000
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
