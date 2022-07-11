import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: String | undefined;

  constructor(private location: Location, private router: Router) {
    router.events.subscribe(
      (event) => event instanceof NavigationEnd && this.handleRouteChange()
    );
  }
  url = 'http://localhost:4200/';
  ngOnInit(): void {}

  handleRouteChange = () => {
    console.log(this.router.url);
    const url = this.router.url;
    const keys = this.router.url.split('/');
    if (this.router.url.endsWith('/')) {
      this.title = 'Welcom back';
    }
    if (this.router.url.endsWith('categories')) {
      this.title = 'Our categoies';
      console.log(this.title);
    }
    if (this.router.url.includes('categories')) {
      if (this.router.url.endsWith('edit')) {
        this.title = 'edit category';
      }
      if (this.router.url.endsWith('add')) {
        this.title = 'add category';
      }
    }
    if (this.router.url.includes('products')) {
      if (this.router.url.endsWith('edit')) {
        this.title = 'edit product';
      } else if (this.router.url.endsWith('add')) {
        this.title = 'add product';
      } else if (keys[2]) {
        this.title = `our ${keys[2]} list`;
      }
    }
  };
}
