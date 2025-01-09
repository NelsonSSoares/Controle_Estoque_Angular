import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { ProductsServiceService } from 'src/app/services/products/products-service.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products-data-transfer.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  private ref! : DynamicDialogRef;
  public productsDatas: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsServiceService,
    private productsDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
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
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao buscar produtos',
            detail: 'Tente novamente mais tarde',
            life: 2000
          });
          this.router.navigate(['/dashboard']);
        }
      });
  }

  handleProductAction(event: EventAction): void{
    if(event){
      this.ref = this.dialogService.open(ProductFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          productsDatas: this.productsDatas
        }
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.getApiProductsData(),
      });
    }

  }

  handleDeleteProduct(event: {
    product_id: string;
    productName: string;
  }): void{

    this.confirmationService.confirm({
      message: `Deseja realmente excluir o produto ${event?.productName}?`,
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () =>{
        this.deleteProduct(event?.product_id);
      }
    });

  }
  deleteProduct(product_id: string) {
    if(product_id){
      this.productsService.deleteProduct(product_id)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (response) => {
          if(response){
            this.messageService.add({
              severity: 'success',
              summary: 'Produto excluído',
              detail: 'Produto excluído com sucesso',
              life: 2000
            });
            this.getApiProductsData();
          }
        },
        error: (error) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao excluir produto',
            detail: 'Tente novamente mais tarde',
            life: 2000
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
