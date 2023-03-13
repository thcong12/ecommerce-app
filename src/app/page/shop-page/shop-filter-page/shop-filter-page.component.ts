import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { debounce, forkJoin, tap } from 'rxjs';
import { brand, categlory, color, product } from 'src/app/core/mock/categlory';
import { GetDataService } from 'src/app/shared/service/get-data.service';

@Component({
  selector: 'app-shop-filter-page',
  templateUrl: './shop-filter-page.component.html',
  styleUrls: ['./shop-filter-page.component.scss'],
  host: { class: 'shop_sidebar_area' },
})
export class ShopFilterPageComponent implements OnInit {
  public rangeValues: number[] = [0, 1000];
  public category: any = [];
  public products1: any = [];
  public product1st: any = [];
  public colorList: any = [];
  public brand: any = [];
  public brandFilter: any = [];
  @Output() products = new EventEmitter<any>();
  constructor(
    private dataSv: GetDataService,
    private primengConfig: PrimeNGConfig
  ) {}
  public getData() {
    forkJoin({ cate: categlory, product: product, color: color, brand: brand })
      .pipe(
        tap(({ cate, product, color, brand }) => {
          this.category = cate;
          this.products1 = product;
          this.product1st = product;
          this.colorList = color;
          this.brand = brand;
        })
      )
      .subscribe({
        complete: () => {
          this.products.emit(this.products1);
        },
      });
  }
  public getProductByCategory(value: string) {

    this.products1 = this.product1st.filter((item:any) => {
  
      console.log(item.catagory)
      return item.category == value
    });
    this.products.emit(this.products1);

  }
  public addBrand(value: any) {
    if (this.brandFilter.includes(value)) {
      this.brandFilter = this.brandFilter.filter((item: any) => {
        return item != value;
      });
      if (this.brandFilter.length == 0) {
        this.products.emit(this.product1st);
      } else {
        this.products.emit(this.getProductByBrand(this.brandFilter));
      }
    } else {
      this.brandFilter.push(value);
      this.products.emit(this.getProductByBrand(this.brandFilter));
    }
    // this.brandFilter.push(value)
  }
  public getProductByColor(value: any) {
    let productsByColor = this.products1.filter((item: any) => {
      return item.color == value;
    });
    this.products.emit(productsByColor);
  }
  public getProductByBrand(value: any) {
    let newArray: any[] = [];

    if (!value) {
      newArray = this.product1st;
    } else {
      this.products1.map((item: any) => {
        if (value.includes(item.brands)) {
          newArray.push(item);
        }
      });
    }
    return newArray;
  }
  public handleChange(e: any) {
    let newarray = this.products1.filter((item: any) => {
      return item.price >= e.values[0] && item.price <= e.values[1];
    });
    this.products.emit(newarray);
  }
  ngOnInit(): void {
    this.getData();
    if(this.dataSv.category){
      this.getProductByCategory(this.dataSv.category)
    }
  }
}
