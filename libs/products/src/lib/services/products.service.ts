import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@env/environment.development';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrlProducts = environment.apiUrl + 'products';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrlProducts);
  }
  getProductId(productId: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrlProducts + `/${productId}`);
  }
  createProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrlProducts, product);
  }
  updateProduct(id: any, product: FormData): Observable<Product> {
    return this.http.put<Product>(this.apiUrlProducts + '/' + id, product);
  }
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(this.apiUrlProducts + `/${productId}`);
  }
  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }
  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.apiUrlProducts + `/get/featured/${count}`
    );
  }
}
