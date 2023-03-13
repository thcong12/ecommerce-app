import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  public listPage: any = [
    { routerLink: 'home', content: 'Home'},
    { routerLink: 'shop', content: 'Shop' },
    { routerLink: 'product', content: 'Product'},
    { routerLink: 'cart', content: 'Cart' },
    { routerLink: 'checkout', content: 'Checkout' },
  ];
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
