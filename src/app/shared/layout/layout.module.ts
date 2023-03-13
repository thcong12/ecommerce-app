import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';


const declarations: any[] = [LayoutComponent,TopNavComponent,BottomNavComponent,SideNavComponent,LoaderComponent];
const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  RouterModule,
];

@NgModule({
  declarations: [...declarations ],
  exports: [...declarations, ...imports],
  imports: [...imports],
})
export class LayoutModule {}
