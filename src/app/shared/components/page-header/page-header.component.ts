import { Component, OnInit, ViewEncapsulation, Input, HostBinding } from '@angular/core';
import { MenuService } from '@core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-header',
  host: {
    class: 'matero-page-header',
  },
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent implements OnInit {
  @Input() image = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() nav: string[] = [];
  @Input() showBreadCrumb = true;

  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }

    this.title = this.title || this.nav[this.nav.length - 1]
    //this.image = "assets/images/icons/t-" + this.title + ".png"
  
  }

  genBreadcrumb() {
    const states = this.router.url.slice(1).split('/');
    this.nav = this.menuService.getMenuLevel(states)  
    this.nav.unshift('inicio');
  }
}
