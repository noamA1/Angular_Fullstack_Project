import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from 'src/app/shared/models/category';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  categoriesMenu: Category[] = [];
  isLogin: boolean = false;
  userRole: string | undefined;
  displayName: String | undefined;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    // console.log(this.auth.getUser().displayName);
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categoriesMenu = data;
    });
    this.userRole = JSON.parse(localStorage.getItem('user')!).role;
    this.isLogin = this.auth.isLoggedIn;
  }

  navigateMenu(categry: String) {
    this.router.navigate([`/products/${categry}`]);
  }

  signOut() {
    this.auth.SignOut();
  }
}
