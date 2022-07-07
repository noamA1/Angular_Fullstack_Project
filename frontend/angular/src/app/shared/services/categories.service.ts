import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  URL = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}/categories`);
  }

  uploadImage(image: FormData) {
    return this.http
      .post(`${this.URL}/category-image`, image)
      .subscribe((res) => {
        console.log(res);
      });
  }

  addCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(`${this.URL}/categories`, newCategory);
  }

  editCategory(newCategory: Category, id: String): Observable<Category> {
    return this.http.put<Category>(`${this.URL}/categories/${id}`, newCategory);
  }

  deleteCategory(id: String): Observable<Category> {
    return this.http.delete<Category>(`${this.URL}/categories/${id}`);
  }

  getProducts(categoryName: String): Observable<Category[]> {
    console.log(categoryName);
    return this.http.get<Category[]>(
      `${this.URL}/categories/products/${categoryName}`
    );
  }
}
