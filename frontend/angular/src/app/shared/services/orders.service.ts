import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  USERS_ORDERS_URL = 'http://localhost:5000/api/users/orders';
  ORDERS_URL = 'http://localhost:5000/api/orders';
  BILL_URL = 'http://localhost:5000/api/users/orders/bill';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.ORDERS_URL}`);
  }

  addOrder(newOrder: Order): Observable<Order> {
    console.log(newOrder);
    return this.http.post<Order>(`${this.USERS_ORDERS_URL}`, newOrder);
  }

  getUserOrders(userId: String): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.USERS_ORDERS_URL}/${userId}`);
  }

  updateOrderStatus(orderId: String, status: String): Observable<Order> {
    return this.http.put<Order>(`${this.USERS_ORDERS_URL}/${orderId}`, {
      status,
    });
  }

  downloadOrderBill(orderId: String) {
    return this.http.get(`${this.BILL_URL}/${orderId}`, {
      responseType: 'base64' as 'json',
    });
  }

  createOrderBill(order: any) {
    this.http.post(`${this.BILL_URL}`, { order }).subscribe((res) => {
      console.log(res);
    });
  }
}
