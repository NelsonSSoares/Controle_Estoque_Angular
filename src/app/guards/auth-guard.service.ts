
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { UserService } from '../services/user/user-service.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: Router
  ):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | UrlTree
  | boolean{
    if(!this.userService.isLoggedIn()){
      this.router.navigate(['/home']);
      return false;
    }
    this.userService.isLoggedIn();
    return true;
  }

}

// import { UserService } from './../services/user.service';
// import { Injectable, inject } from '@angular/core';
// import {
//   Router,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   CanActivateFn,
// } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// // a classe é criada dentro de AuthGuard
// class PermissionsService {
//   constructor(private router: Router, private userService: UserService) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     if (!this.userService.isLoggedIn()) {
//       alert('usuario nao autenticado')
//       this.router.navigate(['home']);
//       return false;
//     }

//     this.userService.isLoggedIn();
//     return true
//   }
// }

// export const AuthGuard: CanActivateFn = (
//   next: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ): boolean => {
//   return inject(PermissionsService).canActivate(next, state);
// };
// arquivo de rotas (no meu caso estou modularizando a aplicação, então é em dashboard-routing.ts, mas a lógica é a mesma se aplicada em app-routing.module.ts

// const routes: Routes = [
//   { path: '', canActivate: [AuthGuard], component: DashboardComponent },
// ];

