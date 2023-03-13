import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { SharedModule } from 'src/app/shared/shared.module';
import { CartPageRoutingModule } from './cart-page-routing.module';
import { CartPageComponent } from './cart-page.component';


const declarations: any[] = [CartPageComponent];
const imports = [CommonModule, SharedModule,CartPageRoutingModule];

@NgModule({
  declarations: [...declarations],
  exports: [...declarations, ...imports],
  imports: [...imports],
})
export class CartPageModule {}
