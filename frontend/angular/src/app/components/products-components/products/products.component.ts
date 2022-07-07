import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] | undefined;
  categoryName: String = '';
  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getProducts() {
    this.categoriesService
      .getProducts(this.categoryName)
      .subscribe((productsData) => {
        this.products = productsData[0].products;
      });
  }

  ngOnInit(): void {
    this.categoryName = this.route.snapshot.params['categoryName'];
    // console.log(this.categoryName);
    this.getProducts();
  }

  editProduct(productToEdit: Product) {
    this.router.navigateByUrl('products/edit', {
      state: { product: productToEdit },
    });
  }

  delProduct(docId: any) {
    this.productsService.deleteProduct(docId).subscribe((result) => {
      console.log(result);
      this.getProducts();
    });
  }
}
