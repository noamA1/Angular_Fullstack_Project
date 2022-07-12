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
}
