import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any;
  categoryName: String = '';

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.categoryName = this.route.snapshot.params['categoryName'];
        this.getProducts();
      }
    });
    this.productsService.subject$.subscribe(() => {
      this.getProducts();
    });
  }

  getProducts() {
    this.categoriesService
      .getProducts(this.categoryName)
      .subscribe((productsData) => {
        this.products = productsData[0].products;
      });
  }

  // updateProduct(quantity: number){
  //   pro
  // }

  ngOnInit(): void {}
}
