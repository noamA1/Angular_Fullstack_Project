import { Product } from 'src/app/shared/models/product';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart-item';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: CartItem[] | undefined;
  cartId: String = '62c2a37c6aa6b5c81de15933';
  overallPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems(this.cartId).subscribe((result) => {
      this.cartProducts = result.products;
      if (this.cartProducts) {
        this.sumOverallPrice();
      }
    });
  }

  sumOverallPrice() {
    this.cartProducts?.forEach((product) => {
      this.overallPrice += +product.totalPrice!;
    });
  }
}
