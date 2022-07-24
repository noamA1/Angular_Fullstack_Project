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
  // currentTime: number | undefined;

  constructor(private router: Router, private auth: AuthService) {
    router.events.subscribe(
      (event) => event instanceof NavigationEnd && this.handleRouteChange()
    );
  }
  url = 'http://localhost:4200/';
  ngOnInit(): void {
    this.handleRouteChange();
  }

  setTitle() {
    const date = new Date();
    const currentTime = +date.toLocaleTimeString().substring(0, 2);

    if (currentTime > 6 && currentTime < 12) {
      this.title = 'Good morning ';
    } else if (currentTime > 12 && currentTime < 16) {
      this.title = 'Good noon ';
    } else if (currentTime > 16 && currentTime < 19) {
      this.title = 'Good afternoon ';
    } else if (currentTime > 19 && currentTime < 22) {
      this.title = 'Good evening ';
    } else {
      this.title = 'Good night ';
    }
  }

  handleRouteChange = () => {
    this.setTitle();
    const url = this.router.url;
    const keys = this.router.url.split('/');
    if (this.router.url.endsWith('/')) {
      this.title += `${this.auth.getUser().displayName!}`;
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
    if (url.includes('orders')) {
      if (url.endsWith('/')) {
        if (this.auth.getUser().role === 'user') {
          this.title = 'Your Previous Orders';
        } else {
          this.title = 'All orders';
        }
      }
      if (url.endsWith('add')) {
        this.title = 'Place your order';
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
