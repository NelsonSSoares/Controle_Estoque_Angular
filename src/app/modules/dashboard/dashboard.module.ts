import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dahsboard.routing';
//PRIMENG
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    //PrimeNg
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule,
    ChartModule,
    SidebarModule,
    // SharedModule
    SharedModule
  ],
  providers: [MessageService, CookieService]

})
export class DashboardModule { }
