import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged, fromEvent, map, pluck, switchMap
} from 'rxjs';
import { GetDataService } from '../../service/get-data.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  host: { class: 'search-wrapper section-padding-100' },
})
export class TopNavComponent implements OnInit,AfterViewInit {
  public isOpen: boolean = false;
  @ViewChild('searchKey') searchKey!: ElementRef;
  @Output() isOpenSearch = new EventEmitter<boolean>();
  public products: any = [];
  public searchResult:any = [];
  public searchKeyWord:any = '';
  constructor(private dataSv: GetDataService,private router:Router) {}
  ngAfterViewInit(): void {
    this.searchFunction()
  }
  public closeSearchNav() {
    this.isOpen = false;
    this.searchResult = []
    this.isOpenSearch.emit(this.isOpen);
  }
  private searchFunction() {
    fromEvent(this.searchKey.nativeElement, 'keyup')
      .pipe(
        pluck('target', 'value'),
        debounceTime(400),
        distinctUntilChanged<any>(),
        switchMap((keyword) => {
          if(keyword.length>3){
            keyword = keyword.toLowerCase();
            this.searchKeyWord = keyword
            this.searchResult = this.products.filter((item:any) =>{
              return JSON.stringify(item).toLowerCase().includes(keyword);
            }) 
            return this.searchResult
          }else{
            this.searchResult = []
            
            return this.searchResult
          }
        })
      )
      .subscribe({ complete: () => {} });
  }
  public gotoSearchPageResult(){
    this.router.navigate(['/shop',this.searchKeyWord])
    this.searchResult = []
    this.closeSearchNav()
  }
  public goTodetailProduct(id:any){
    this.router.navigate(['/product/',id])
    this.searchResult = []
    this.closeSearchNav()
  }
  ngOnInit(): void {
    this.dataSv.getproduct().pipe(
      map((_res) => {
        this.products = _res;

      })
    ).subscribe();
  }
}
