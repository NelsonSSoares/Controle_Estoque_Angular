import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { RouterModule } from '@angular/router';

import { ProductsHomeComponent } from './page/products-home/products-home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PRODUCTS_ROUTES } from './products.routing';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { DropdownModule } from 'primeng/dropdown';
import { ProductFormComponent } from './components/product-form/product-form.component';


@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProductsTableComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(PRODUCTS_ROUTES),
    //PRIME NG

    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputTextModule,
    InputSwitchModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    ConfirmDialogModule,
    TooltipModule,
    DropdownModule
  ],
  providers: [
    DialogService, ConfirmationService
  ]
})
export class ProductsModule { }
