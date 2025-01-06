import { MessageService } from 'primeng/api';
import { ProductsServiceService } from './../../../../services/products/products-service.service';
import { Component, OnDestroy } from '@angular/core';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsDataTransferService } from 'src/app/shared/services/products-data-transfer.service';
import { Subject, takeUntil } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnDestroy {

  public productsChartDatas!: ChartData;
  public pruductsChartOptions!: ChartOptions;
  public productsList: Array<GetAllProductsResponse> = [];


  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private productsService: ProductsServiceService,
    private messageService: MessageService, // PRIMENG TOAST, FAZ A SNACKBAR DE NOTIFICAÇÃO
    private productsDataTransferService: ProductsDataTransferService
  ) { }

// INICIALIZA O COMPONENTE E CHAMA A FUNÇÃO DE BUSCAR TODOS OS PRODUTOS
  ngOnInit(): void {
    this.getAllProductsDatas();

  }
  // BUSCA TODOS OS PRODUTOS
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
            this.setProductsChartConfig();
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
  /*
  * Configuração do gráfico de produtos
  */
  setProductsChartConfig(): void {

    if (this.productsList.length > 0) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfeBorder = documentStyle.getPropertyValue('--surface-border');

      this.productsChartDatas = {
        labels: this.productsList.map((element) => element?.name),
        datasets: [
          {
            label: 'Quantidade',
            backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
            borderColor: documentStyle.getPropertyValue('--indigo-400'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
            data: this.productsList.map((element) => element?.amount)
          }
        ]
      };


      this.pruductsChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },

        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
              }
            },
            grid: {
              color: surfeBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfeBorder
            }
          }
        }
      };
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

