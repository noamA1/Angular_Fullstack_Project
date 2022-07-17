import { FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Component, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart-item';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product | undefined;
  @Input() categoryName: String | undefined;

  quantity = new FormControl('', Validators.required);
  cartItem: CartItem | undefined;
  quantityArray: Number[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setQuantityArray();
  }

  setQuantityArray() {
    let maxQuantity;
    if (this.categoryName === 'Drinks') {
      maxQuantity = 24;
    } else {
      maxQuantity = 10;
    }
    for (let i = 1; i <= maxQuantity; i++) {
      this.quantityArray.push(i);
    }
  }

  editProduct(productToEdit: Product) {
    this.router.navigateByUrl('products/edit', {
      state: { product: productToEdit },
    });
  }

  delProduct(docId: any) {
    this.productsService.deleteProduct(docId).subscribe((result) => {
      console.log(result);
    });
  }

  addToCart(product: Product) {
    const cart = this.cartService.get();
    // console.log(this.cartService.get());
    this.cartItem = {
      cartId: cart!,
      quantity: this.quantity.value,
      product: `${product._id}`,
    };

    this.cartService.addItemToCart(this.cartItem).subscribe((result) => {
      this.cartService.refreshData();
      console.log(result);
    });
  }
}
