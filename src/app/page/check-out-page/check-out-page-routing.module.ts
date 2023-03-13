import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutPageComponent } from './check-out-page.component';
import { PaymentSuccessPageComponent } from './payment-success-page/payment-success-page.component';

const routes: Routes = [
  {
    path:'',
    component:CheckOutPageComponent
    
  },
  {
    path:'success',
    component:PaymentSuccessPageComponent
  }
];  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckOutPageRoutingModule { }
