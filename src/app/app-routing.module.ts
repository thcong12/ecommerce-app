import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./page/index-page/index-page.module').then(
        (m) => m.IndexPageModule
      ),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./page/shop-page/shop-page.module').then(
        (m) => m.ShopPageModule
      ),
  },
    {
    path: 'product',
    loadChildren: () =>
      import('./page/product-detail-page/product-detail-page.module').then(
        (m) => m.ProductDetailPageModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./page/cart-page/cart-page.module').then(
        (m) => m.CartPageModule
      ),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./page/check-out-page/check-out-page.module').then(
        (m) => m.CheckOutPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
