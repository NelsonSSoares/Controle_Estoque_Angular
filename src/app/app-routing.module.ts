import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuardService } from './guards/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    //carrega rota sob demanda
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module')
    .then(m => m.DashboardModule),
    canActivate: [AuthGuardService] // Serve para proteger a rota, só acessa se estiver logado
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.module') //lazy loading carrega o modulo somente quando a rota é acessada
    .then(m => m.ProductsModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
