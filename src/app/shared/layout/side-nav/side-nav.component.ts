import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GetDataService } from '../../service/get-data.service';
import { AppConstant } from '../../utilities/app.constant';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  public isOpen: boolean = false;
  public cartLength:BehaviorSubject<number> = this.dataSv.cartLength
  @Output() isOpenSearch = new EventEmitter<boolean>();
  public listPage: any = [
    { routerLink: 'home', content: 'Home' },
    { routerLink: 'shop', content: 'Shop' },
  ];
  constructor(private router: Router,private dataSv:GetDataService) {}

  public openSearchNav() {
    this.isOpen = !this.isOpen;
    this.isOpenSearch.emit(this.isOpen);
  }
  ngOnInit(): void {
    this.dataSv.getCart()
  }
}
