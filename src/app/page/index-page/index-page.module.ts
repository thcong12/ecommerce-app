import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { SharedModule } from 'src/app/shared/shared.module';
import { IndexPageRoutingModule } from './index-page-routing.module';
import { IndexPageComponent } from './index-page.component';

const declarations: any[] = [IndexPageComponent];
const imports = [CommonModule, SharedModule,IndexPageRoutingModule];

@NgModule({
  declarations: [...declarations],
  exports: [...declarations, ...imports],
  imports: [...imports],
})
export class IndexPageModule {}
