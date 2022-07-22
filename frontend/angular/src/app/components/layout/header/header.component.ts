import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: String | undefined;

  constructor(
    private location: Location,
    private router: Router,
    private auth: AuthService
  ) {
    router.events.subscribe(
      (event) => event instanceof NavigationEnd && this.handleRouteChange()
    );
  }
  url = 'http://localhost:4200/';
  ngOnInit(): void {
    this.handleRouteChange();
  }

  handleRouteChange = () => {
    // console.log(this.auth.getUser());
    const url = this.router.url;
    const keys = this.router.url.split('/');
    if (this.router.url.endsWith('/')) {
      this.title = `Welcom back ${this.auth.getUser().displayName!}`;
    }
    if (url.endsWith('categories')) {
      this.title = 'Our categoies';
    }
    if (url.includes('categories')) {
      if (url.endsWith('edit')) {
        this.title = 'edit category';
      }
      if (url.endsWith('add')) {
        this.title = 'add category';
      }
    }
    if (url.includes('products')) {
      if (url.endsWith('edit')) {
        this.title = 'edit product';
      } else if (url.endsWith('add')) {
        this.title = 'add product';
      } else if (keys[2]) {
        this.title = `our ${keys[2]} list`;
      } else if (url.endsWith('')) {
        this.title = 'Search result';
      }
    }
    if (url.includes('profile')) {
      if (url.endsWith('edit')) {
        this.title = 'edit your profile';
      } else if (url.endsWith('')) {
        this.title = 'Your profile';
      }
    }
    if (url.endsWith('orders')) {
      if (this.auth.getUser().role === 'user') {
        this.title = 'Your Previous Orders';
      } else {
        this.title = 'All orders';
      }
    }

    if (url.includes('authentication')) {
      if (url.endsWith('log-in')) {
        this.title = 'log in';
      } else if (url.endsWith('registration')) {
        this.title = 'Register';
      } else if (url.endsWith('forgot-password')) {
        this.title = 'forgot password';
      }
    }
  };
}
