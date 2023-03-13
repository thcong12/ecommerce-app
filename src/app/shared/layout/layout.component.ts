import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @HostBinding('class.search-wrapper-on') isSearchOpen = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (scrollPosition > 100) {
      this.scrollTopVisible = true;
    } else {
      this.scrollTopVisible = false;
    }
  }
  @ViewChild('scrollToTopBtn') scrollToTopBtn!: ElementRef;
  public scrollTopVisible: boolean = false;
  constructor() {}
  ngAfterViewInit(): void {}

  public aaaa(value: any) {
    console.log(value);
    this.isSearchOpen = value;
  }

  public scrollToTop() {
    const currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  ngOnInit(): void {}
}
