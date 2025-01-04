import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/auth/AuthResponse';
import { SignUpUserResponse } from 'src/app/models/interfaces/user/SignUpUserResponse';
import { SignUpUserResquest } from 'src/app/models/interfaces/user/SignUpUserResquest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL= environment.API_URL;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  signupUser(requestData: SignUpUserResquest): Observable<SignUpUserResponse>{
    return this.http.post<SignUpUserResponse>(`${this.API_URL}/user`, requestData);
  }

  authUser(requestData: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestData);

  }

  isLoggedIn(): boolean{
    //verificar se o usuario possui um token ou cookie
    const JWT_TOKEN = this.cookieService.get('token');
    return JWT_TOKEN ? true : false;
  }

}
