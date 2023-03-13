import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { tap } from 'rxjs';
import { categlory } from 'src/app/core/mock/categlory';
import { Product } from 'src/app/shared/model/product';
import { GetDataService } from 'src/app/shared/service/get-data.service';
import * as Isotope from 'isotope-layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
  host: { class: 'products-catagories-area clearfix' },
})
export class IndexPageComponent implements OnInit, AfterViewInit {
  @ViewChild('imgageProduct') imageProduct!: ElementRef;
  public products: Product[] = [];
  public category: any = [];
  public aaaaa: any = '';

  constructor(private dataSv: GetDataService,private router:Router) {}
  ngAfterViewInit(): void {
    this.renderElement();
    this.isotopeAAA()
  }
  public isotopeAAA(){
    let singleProductCateglory =this.imageProduct.nativeElement.getElementsByClassName('.single-products-catagory')[0]
    const elem = this.imageProduct.nativeElement;
    new Isotope(elem, {
      itemSelector: singleProductCateglory,
      percentPosition: true,
      masonry: {
        columnWidth: singleProductCateglory,
      },
    });
  }
  private getData1() {
    return categlory
      .pipe(
        tap((_res) => {
          this.category = _res;
        })
      )
      .subscribe();
  }
  public renderElement() {
    for (let i = 0; i < this.category.length; i++) {
      let ele = this.createElement(this.category[i]);
      ele.style.position = 'absolute';
      this.imageProduct.nativeElement.appendChild(ele);
    }
  }
  public createElement(value: any) {
    let ele = document.createElement('div');
    ele.classList.add('single-products-catagory');
    ele.classList.add('clearfix');
    ele.onclick = ()=>{
      this.router.navigate(['/shop'])
      this.dataSv.category = value.value 
    }
    let ele1 = document.createElement('a');
    ele1.innerHTML = `
    <img style="object-fit: cover;" src="${value.image}" />
    <div class="hover-content">
        <div class="line"></div>
        <p>From 180$</p>
        <h4>${value.title}</h4>
    </div>`;
    ele.appendChild(ele1);
    return ele;
  }
  ngOnInit(): void {
    // this.getData();

    this.getData1();
    setTimeout(() => {
      this.isotopeAAA()
    }, 300);
  }

}
