import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@env/environment.development';
import { Product } from '@frontend/products';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  apiUrlOrders = environment.apiUrl + 'orders';
  apiUrlProducts = environment.apiUrl + 'products';
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrlOrders);
  }
  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(this.apiUrlOrders + `/${orderId}`);
  }

  updateOrder(
    orderId: string,
    orderStatus: { status: string }
  ): Observable<Order> {
    return this.http.put<Order>(this.apiUrlOrders + '/' + orderId, orderStatus);
  }
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(this.apiUrlOrders + `/${orderId}`);
  }
  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlOrders}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalSales));
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlProducts}/${productId}`);
  }
}
