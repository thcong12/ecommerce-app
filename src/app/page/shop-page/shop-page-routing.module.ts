import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';
import { ShopPageComponent } from './shop-page.component';

const routes: Routes = [
  {
    path:'',
    component:ShopPageComponent,
  },
  {
    path:':value',
    component:SearchResultComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopPageRoutingModule { }
