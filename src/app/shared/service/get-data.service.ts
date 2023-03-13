import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { categlory } from 'src/app/core/mock/categlory';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';
import { AppConstant } from '../utilities/app.constant';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private api: string = environment.api;
  private userid: any = 3;
  public cartLength = new BehaviorSubject<number>(0);
  public data!:any
  public category:any = '';
  constructor(private http: HttpClient) {
  
  }

  public getproduct(): Observable<Product[]> {
    const url = this.api + 'products';
    return this.http.get<Product[]>(url);
  }
  
  public getSingleProduct(id: string) {
    const url = `${this.api}products/${id}`;
    return this.http.get(url);
  }
  public getProductByCateglory(cate: any) {
    const url = `${this.api}products/category/${cate}`;
    return this.http.get(url);
  }
  public async getCart() {
    let cart = localStorage.getItem(AppConstant.CART) as any;
    if (!cart) {
      return this.createNewCart();
    } else {
      this.cartLength.next(JSON.parse(cart).length)
    
      return cart;
    }
  }
  public createNewCart() {
    return localStorage.setItem(AppConstant.CART, JSON.stringify([] as any));
  }
  public async addToCart(value: any) {
    let cart = JSON.parse(await this.getCart());
    for (let item in cart) {
      if (cart[item].productId === value.productId) {
        cart[item].qty += value.qty;
        return localStorage.setItem(AppConstant.CART, JSON.stringify(cart));
      }
    }
    cart.push(value);
    this.cartLength.next(cart.length);
    return localStorage.setItem(AppConstant.CART, JSON.stringify(cart));
  }
  public async removeCartItem(value: any){
    let cart = JSON.parse(await this.getCart());
    cart =  cart.filter((item:any) =>{
      return item.productId !== value;
    })
    this.cartLength.next(cart.length)
    return localStorage.setItem(AppConstant.CART, JSON.stringify(cart));
  }
  public checkOut(value:any){
    this.data = value
  }
}
