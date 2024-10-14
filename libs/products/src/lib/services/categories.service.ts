import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrlCategories = environment.apiUrl + 'categories';
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrlCategories);
  }
  getCategoriyId(categoryId: string): Observable<Category> {
    return this.http.get<Category>(this.apiUrlCategories + `/${categoryId}`);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrlCategories, category);
  }
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      this.apiUrlCategories + '/' + category.id,
      category
    );
  }
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(this.apiUrlCategories + `/${categoryId}`);
  }
}
