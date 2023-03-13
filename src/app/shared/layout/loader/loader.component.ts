import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public loader:Subject<boolean> =this.loaderSv.loader
  constructor(private loaderSv:LoaderService) { }

  ngOnInit(): void {
   
  }

}
