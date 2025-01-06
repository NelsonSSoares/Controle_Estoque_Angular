import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsServiceService } from 'src/app/services/products/products-service.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products-data-transfer.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  public productsDatas: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsServiceService,
    private productsDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.getServiceProductsData();
  }



  getServiceProductsData() {
    const productsLoaded = this.productsDtService.getProductsData();
    if(productsLoaded.length > 0){
      this.productsDatas = productsLoaded;
    }else this.getApiProductsData();
  }
  getApiProductsData() {
    this.productsService.getAllProducts()
    .pipe(
      takeUntil(this.destroy$)
    )
      .subscribe({
        next: (response) => {
          if(response.length > 0){
            this.productsDatas = response;
          }
          console.log('PRODUTOS', this.productsDatas);

        },
        error: (error) => {
          console.error(error);
          this.router.navigate(['/dashboard']);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao buscar produtos',
            detail: 'Tente novamente mais tarde',
            life: 2000
          });
        }
      });
  }

  handleProductAction(event: EventAction): void{
    console.log('Dados do Evento Recebido', event);


  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
