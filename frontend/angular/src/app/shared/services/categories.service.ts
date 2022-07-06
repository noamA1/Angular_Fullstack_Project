import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  URL = 'http://localhost:5000/api/categories';
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.URL);
  }
}
