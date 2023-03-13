import { Component, OnInit } from '@angular/core';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { forkJoin, mergeMap, tap } from 'rxjs';
import { categlory } from 'src/app/core/mock/categlory';
import { GetDataService } from 'src/app/shared/service/get-data.service';
import { Message, MessageService } from 'primeng/api';
@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
  providers: [MessageService],
  host: { class: 'row' },
})
export class ShopPageComponent implements OnInit {
  products: any = [];
  constructor(private messageService: MessageService) {}
  ngOnInit(): void {}

  showViaService() {
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }
}
