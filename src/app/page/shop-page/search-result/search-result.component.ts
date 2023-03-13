import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, tap } from 'rxjs';
import { GetDataService } from 'src/app/shared/service/get-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  host: { class: 'cart-table-area section-padding-100' },
})
export class SearchResultComponent implements OnInit {
  public products: any = [];
  public searchKey: any = '';
  constructor(private route: ActivatedRoute, private dataSv: GetDataService) {}
  public getData() {
    this.route.paramMap
      .pipe(
        mergeMap((param) =>
          //  this.searchKey = param.get('value');
          this.dataSv.getproduct().pipe(
            tap((_res:any) => {
              this.searchKey = param.get('value');
              this.products = _res.products.filter((item: any) => {
                return JSON.stringify(item)
                  .toLowerCase()
                  .includes(this.searchKey);
              });
              console.log(this.products)
            })
          )
        )
      )
      .subscribe();
  }
  ngOnInit(): void {
    this.getData()
  }
}
