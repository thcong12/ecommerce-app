import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, mergeMap, tap } from 'rxjs';
import { GetDataService } from 'src/app/shared/service/get-data.service';
import { AppConstant } from 'src/app/shared/utilities/app.constant';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  host: { class: 'cart-table-area section-padding-100' },
})
export class CartPageComponent implements OnInit {
  public cart: any = [];
  public productCartDetail: any = [];
  public totalPrice = 0;
  constructor(private dataSv: GetDataService, private router: Router) {}
  public async getCart() {
    JSON.parse(await this.dataSv.getCart()).forEach((item: any) => {
      this.dataSv
        .getSingleProduct(item.productId)
        .pipe(
          tap((_res) => {
            item = {
              ...item,
              productId: _res,
            };
            this.productCartDetail.push(item);

            this.totalPrice += item.qty * item.productId.price;
          })
        )
        .subscribe({ complete: () => {} });
    });
    this.cart = JSON.parse(await this.dataSv.getCart());
  }
  public addQty(value: number, index: number) {
    this.cart.forEach((item: any) => {
      if (item.productId == value) {
        item.qty++;
        this.productCartDetail[index].qty++;
        this.caculateTotal();
        localStorage.setItem(AppConstant.CART, JSON.stringify(this.cart));
      }
    });
  }
  public subQty(value: number, index: number) {
    this.cart.forEach((item: any) => {
      if (item.productId == value) {
        if (item.qty <= 1) {
          console.log('remove');
          this.dataSv.removeCartItem(value);
          this.productCartDetail = this.productCartDetail.filter(
            (item: any) => {
              return item.productId.id != value;
            }
          );
          this.caculateTotal();
        } else {
          item.qty--;
          this.productCartDetail[index].qty--;

          this.caculateTotal();
          localStorage.setItem(AppConstant.CART, JSON.stringify(this.cart));
        }
      }
    });
  }
  private caculateTotal() {
    let sum = 0;
    this.productCartDetail.map((item: any) => {
      return (sum += item.productId.price * item.qty);
    });
    this.totalPrice = sum;
  }
  public checkOutSubmit() {
    localStorage.setItem(AppConstant.CART, JSON.stringify(this.cart));
    this.router.navigateByUrl('/checkout');
  }
  public removeCartItem(value: any) {
    this.dataSv.removeCartItem(value);
    this.productCartDetail = this.productCartDetail.filter((item: any) => {
      return item.productId.id != value;
    });
    this.caculateTotal();
  }
  ngOnInit(): void {
    // this.getCart();

    this.getCart();
  }
}
