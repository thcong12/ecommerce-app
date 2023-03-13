import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap } from 'rxjs';
import { Product } from 'src/app/shared/model/product';
import { GetDataService } from 'src/app/shared/service/get-data.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
  host: { class: 'single-product-area section-padding-100 clearfix' },
})
export class ProductDetailPageComponent implements OnInit {
  public singleProduct!: Product;
  public imageDisplay!:any;
  public qty:number = 1
  constructor(private route: ActivatedRoute, private dataSv: GetDataService) {}
  public getDetailProductData() {
    this.route.paramMap
      .pipe(
        mergeMap((param: any) =>
          this.dataSv.getSingleProduct(String(param.get('id'))).pipe(
            tap((_res: any) => {
              this.singleProduct = {
                ..._res,
                listImage: [
                  'assets/image/product-img/pro-big-1.jpg',
                  'assets/image/product-img/pro-big-2.jpg',
                  'assets/image/product-img/pro-big-3.jpg',
                  'assets/image/product-img/pro-big-4.jpg',
                ] as any,
              };
            })
          )
        )
      )
      .subscribe((x) => {
        console.log(x);
      });
  }
  public display(id:any){

    this.imageDisplay = id
    console.log(this.imageDisplay)
  }
  public addToCart(value:any,qty:any){
    let data = {
      productId:value.id,
      qty:qty
    }
    this.dataSv.addToCart(data)
  }
  public addQty(){
 
   this.qty ++
    
  }
  public subQty(){
    if(this.qty < 2) this.qty = 1
    else this.qty --
    
  }
  ngOnInit(): void {
    this.display(5)
    this.getDetailProductData();
  }
}
// this.dataSv.getSingleProduct(param)
