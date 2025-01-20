import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';
import { ShortingPipe } from './pipes/shorting.pipe';


@NgModule({
  declarations: [
    ToolbarNavigationComponent,
    ShortingPipe
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule,
    // PrimeNG
    ToolbarModule,
    CardModule,
    ButtonModule
  ],
  exports: [
    ToolbarNavigationComponent,
    ShortingPipe,
  ],
  providers: [DialogService, CurrencyPipe]
})
export class SharedModule { }
