import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from 'src/app/shared/shared.module';
import { CheckOutPageRoutingModule } from './check-out-page-routing.module';
import { CheckOutPageComponent } from './check-out-page.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { PaymentSuccessPageComponent } from './payment-success-page/payment-success-page.component';

const declarations: any[] = [CheckOutPageComponent,CheckoutFormComponent, PaymentSuccessPageComponent];
const imports = [CommonModule, SharedModule,CheckOutPageRoutingModule];

@NgModule({
  declarations: [...declarations, ],
  exports: [...declarations, ...imports],
  imports: [...imports],
})
export class CheckOutPageModule {}
