import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductFormComponent } from 'src/app/modules/products/components/product-form/product-form.component';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: ['./toolbar-navigation.component.scss']
})
export class ToolbarNavigationComponent {

  constructor(
    private CookieService: CookieService,
    private router: Router,
    private dialogService: DialogService
  ) { }

  logout(): void {
    this.CookieService.delete('token');
    this.router.navigate(['/home']);
  }

  handleSaleProduct(): void {
    const saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;
    this.dialogService.open(ProductFormComponent,{
      header: saleProductAction,
      width: '70%',
      contentStyle: {'overflow': 'auto'},
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event:{action: saleProductAction}
      }
    })
  }
}
