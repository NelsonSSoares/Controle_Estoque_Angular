import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';
import { map, Observable } from 'rxjs';
import { DeleteProductResponse } from 'src/app/models/interfaces/products/response/DeleteProductResponse';
import { CreateProductRequest } from 'stock-api/src/models/interfaces/product/CreateProductRequest';
import { CreateProductResponse } from 'src/app/models/interfaces/products/response/CreateProductResponse';
import { EditProductRequest } from 'stock-api/src/models/interfaces/product/EditProductRequest';
import { SaleProductRequest } from 'stock-api/src/models/interfaces/product/SaleProductRequest';
import { SaleProductResponse } from 'src/app/models/interfaces/products/response/SaleProductResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookieService.get('token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.JWT_TOKEN}`
    })
  }

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http.get<Array<GetAllProductsResponse>>(
      `${this.API_URL}/products`, this.httpOptions)
      .pipe(
        map((products) => products.filter((product) => product?.amount > 0))
      );
  }

  deleteProduct(product_id: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(
      `${this.API_URL}/product/delete`,{
        ...this.httpOptions, params: {product_id: product_id}
      }

    );
  }

  createProduct(requestDatas: CreateProductRequest): Observable<CreateProductResponse> {
    return this.http.post<CreateProductResponse>(
      `${this.API_URL}/product`, requestDatas, this.httpOptions
    );
  }

  editProduct(requestDatas: EditProductRequest): Observable<void>{
    return this.http.put<void>(
      `${this.API_URL}/product/edit`, requestDatas, this.httpOptions
    );

  }

  saleProduct(request: SaleProductRequest): Observable<SaleProductResponse>{
    return this.http.put<SaleProductResponse>(
      `${this.API_URL}/product/sale`, {
        amount: request.amount,
      },
      {
        ...this.httpOptions,
        params: {product_id: request.product_id}
      }
    );
  }


}
