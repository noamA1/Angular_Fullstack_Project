import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  URL = 'http://localhost:5000/api/products';
  uploadImage(image: FormData) {
    console.log(image);
    return this.http.post(`${this.URL}-image`, image).subscribe((res) => {
      console.log(res);
    });
  }

  addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(`${this.URL}`, newProduct);
  }

  editProduct(newProduct: Product, id: String): Observable<Product> {
    return this.http.put<Product>(`${this.URL}/${id}`, newProduct);
  }

  deleteProduct(productId: String): Observable<Product> {
    return this.http.delete<Product>(`${this.URL}/${productId}`);
  }
}
