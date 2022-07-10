import { Product } from 'src/app/shared/models/product';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/shared/models/cart-item';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

interface displyProduct {
  price: Number | undefined;
  image: String | undefined;
  totalPrice: Number | undefined;
  name: String | undefined;
  id: String | undefined;
  quantity: Number | undefined;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: CartItem[] | undefined;
  cartId: String = '62c2a37c6aa6b5c81de15933';
  overallPrice: number = 0;
  displayProducts: displyProduct[] = [];
  allProducts: Product[] | undefined;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.cartService.getCartItems(this.cartId).subscribe((result) => {
      this.cartProducts = result.products;
      if (this.cartProducts) {
        this.sumOverallPrice();
        this.prepareToDisplay();
      }
    });

    // this.productsService.getAllProducts().subscribe((result) => {
    //   this.allProducts = result;
    // });
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((result) => {
      this.allProducts = result;
    });
  }

  sumOverallPrice() {
    this.cartProducts?.forEach((product) => {
      this.overallPrice += +product.totalPrice!;
    });
  }

  prepareToDisplay() {
    this.cartProducts?.forEach((cartProduct) => {
      const cartProductDetails = this.allProducts?.find(
        (product) => product._id === cartProduct.product
      );
      this.displayProducts?.push({
        name: cartProductDetails?.name,
        image: cartProductDetails?.image,
        price: cartProductDetails?.price,
        quantity: cartProduct.quantity,
        totalPrice: cartProduct.totalPrice,
        id: cartProduct._id,
      });
    });
    console.log(this.displayProducts);
  }
}
