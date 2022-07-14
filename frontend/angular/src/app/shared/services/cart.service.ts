import { DisplayProduct } from './../interfaces/display-product';
import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  CART_ITEM_URL = 'http://localhost:5000/api/carts/products';
  CART_URL = 'http://localhost:5000/api/carts';

  displayProducts: DisplayProduct[] = [];
  cartProducts: CartItem[] = [];

  subject$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  refreshData() {
    this.subject$.next('refreshed');
  }

  addItemToCart(newItem: CartItem) {
    // console.log(newItem);
    return this.http.post<CartItem>(
      `${this.CART_ITEM_URL}/add-product`,
      newItem
    );
  }

  getCartItems(docId: String): Observable<Cart> {
    return this.http.get<Cart>(`${this.CART_ITEM_URL}/${docId}`);
  }

  deleteItem(docId: String): Observable<CartItem> {
    return this.http.delete<CartItem>(`${this.CART_ITEM_URL}/${docId}`);
  }

  prepareToDisplay(allProducts: Product[], docId: String) {
    this.displayProducts = [];
    this.getCartItems(docId).subscribe((data) => {
      this.cartProducts = data.products;
      this.cartProducts!.forEach((cartProduct) => {
        const cartProductDetails = allProducts?.find(
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
    });
    return this.displayProducts;
  }
}
