import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/auth/AuthResponse';
import { SignUpUserResponse } from 'src/app/models/interfaces/SignUpUserResponse';
import { SignUpUserResquest } from 'src/app/models/interfaces/SignUpUserResquest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL= environment.API_URL;

  constructor(private http: HttpClient) { }

  signupUser(requestData: SignUpUserResquest): Observable<SignUpUserResponse>{
    return this.http.post<SignUpUserResponse>(`${this.API_URL}/user`, requestData);
  }

  authUser(requestData: AuthRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestData);

  }
}
