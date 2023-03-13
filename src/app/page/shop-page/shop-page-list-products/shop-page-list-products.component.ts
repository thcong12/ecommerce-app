import { Component, Input, OnInit } from '@angular/core';
import { SelectItem, PrimeNGConfig, MessageService } from 'primeng/api';
import { GetDataService } from 'src/app/shared/service/get-data.service';

@Component({
  selector: 'app-shop-page-list-products',
  templateUrl: './shop-page-list-products.component.html',
  styleUrls: ['./shop-page-list-products.component.scss'],
  host:{'class':'container-fluid'}
})
export class ShopPageListProductsComponent implements OnInit {
  public rangeValues: number[] = [0, 1000];
  public category: any = [];
  public optionPageChange  = [5,10,15]
  public isGridDisplay:boolean = true
  @Input() products: any = [];
  currentPage: number = 1;
  productInpage: number = 5;
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  constructor(    private dataSv: GetDataService,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService) { }

    ngOnInit(): void {
      // this.getData();
      this.sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' },
      ];
  
      this.primengConfig.ripple = true;
    }
    public onSortChange(event: any) {
      let value = event.value;
  
      if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
      } else {
        this.sortOrder = 1;
        this.sortField = value;
      }
    }
    public gridView(){
      this.isGridDisplay = true
      console.log(this.isGridDisplay)
    }
    public listView(){
      this.isGridDisplay = false
      console.log(this.isGridDisplay)
    }
    public addtoCart(value:any){
      let data = {
        productId:value.id,
        qty:1
      }
      this.dataSv.addToCart(data)
      
    }
  
    public paginate(event: any) {
      //event.first = Index of the first record
      //event.rows = Number of rows to display in new page
      this.currentPage = event.page + 1;
      //event.pageCount = Total number of pages
    }

}
