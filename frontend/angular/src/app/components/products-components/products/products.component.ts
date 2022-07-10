import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  Route,
  Router,
} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CartItem } from 'src/app/shared/models/cart-item';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] | undefined;
  categoryName: String = '';
  quantity: Number = 1;
  cartItem: CartItem | undefined;
  quantityArray: Number[] | undefined;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.categoryName = this.route.snapshot.params['categoryName'];
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.categoriesService
      .getProducts(this.categoryName)
      .subscribe((productsData) => {
        this.products = productsData[0].products;
      });
  }

  ngOnInit(): void {
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

  addToCart(product: Product) {
    this.cartItem = {
      cartId: '62c2a37c6aa6b5c81de15933',
      quantity: this.quantity,
      product: `${product._id}`,
    };

    this.cartService.addItemToCart(this.cartItem).subscribe((result) => {
      console.log(result);
    });
  }
}
