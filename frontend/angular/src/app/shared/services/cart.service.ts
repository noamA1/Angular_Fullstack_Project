import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  CART_ITEM_URL = 'http://localhost:5000/api/carts/products';
  CART_URL = 'http://localhost:5000/api/carts';
  constructor(private http: HttpClient) {}

  addItemToCart(newItem: CartItem) {
    // console.log(newItem);
    return this.http.post<CartItem>(
      `${this.CART_ITEM_URL}/add-product`,
      newItem
    );
  }
}
