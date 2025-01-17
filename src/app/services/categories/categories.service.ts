import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';
import {GetCategoriesResponse } from 'src/app/models/interfaces/categories/response/GetCategoriesResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.CookieService.get('token');
  private httpOtions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.JWT_TOKEN}`
    })
  };

constructor(
  private httpClient: HttpClient,
  private CookieService: CookieService
) { }

  getAllCategories(): Observable<GetCategoriesResponse> {
    return this.httpClient.get<GetCategoriesResponse>
    (`${this.API_URL}/categories`, this.httpOtions);
  }

  createNewCategory(requestData: {name: string}): Observable<Array<GetCategoriesResponse>> {
    return this.httpClient.post<Array<GetCategoriesResponse>>
    (`${this.API_URL}/category`, requestData, this.httpOtions);

  }

  deleteCategory(requestData:{category_id: string} ): Observable<void> {
    return this.httpClient.delete<void>
    (`${this.API_URL}/category/delete`, {
      ...this.httpOtions,
      params:{
        category_id: requestData?.category_id
      }
    });
  }

}
