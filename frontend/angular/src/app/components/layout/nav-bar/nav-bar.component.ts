import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  categoriesMenu: Category[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categoriesMenu = data;
    });
  }

  navigateMenu(categry: String) {
    this.router.navigate([`/products/${categry}`]);
  }
}
