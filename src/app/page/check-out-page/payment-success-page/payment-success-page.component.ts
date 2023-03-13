import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/shared/service/get-data.service';

@Component({
  selector: 'app-payment-success-page',
  templateUrl: './payment-success-page.component.html',
  styleUrls: ['./payment-success-page.component.scss'],
  host: { class: 'cart-table-area section-padding-100' },
})
export class PaymentSuccessPageComponent implements OnInit {
  public data:any = {} as any;
  constructor(private dataSv:GetDataService) { }

  ngOnInit(): void {
    if(this.dataSv.data){
      console.log(this.dataSv.data)
      this.data = this.dataSv.data
    }

    
  }

}
