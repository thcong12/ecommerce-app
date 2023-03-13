import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loader = new Subject<boolean>();
  constructor() { }
  public show(){
    this.loader.next(true)
  }
  public hide(){
    this.loader.next(false)
  }
}
