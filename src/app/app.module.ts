import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './modules/home/home.component';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ProductsComponent } from './models/interfaces/products/products.component';
import { GetAllProductsResponseTsComponent } from './models/interfaces/products/response/get-all-products-response.ts/get-all-products-response.ts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    GetAllProductsResponseTsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    //PRIMENG IMPORTS
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,


  ],
  //COOKIE SERVICE
  providers: [CookieService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
