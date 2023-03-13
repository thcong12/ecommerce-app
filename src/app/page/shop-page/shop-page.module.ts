import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShopPageRoutingModule } from './shop-page-routing.module';
import { ShopPageComponent } from './shop-page.component';

import { PaginatorModule } from 'primeng/paginator';
import { SearchResultComponent } from './search-result/search-result.component';
import { ShopFilterPageComponent } from './shop-filter-page/shop-filter-page.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import {RatingModule} from 'primeng/rating';

import { RippleModule } from 'primeng/ripple';
import { ShopPageListProductsComponent } from './shop-page-list-products/shop-page-list-products.component';
const declarations: any[] = [ShopPageComponent];
const imports = [CommonModule, SharedModule, ShopPageRoutingModule];
const primeNg: any[] = [
  SliderModule,
  InputTextModule,
  PaginatorModule,
  MessagesModule,
  MessageModule,
  ButtonModule,
  TabViewModule,
  RippleModule,
  RatingModule
];
@NgModule({
  declarations: [
    ...declarations,
    SearchResultComponent,
    ShopFilterPageComponent,
    ShopPageListProductsComponent,
  ],
  exports: [...declarations, ...imports],
  imports: [...imports, ...primeNg],
})
export class ShopPageModule {}
2;
