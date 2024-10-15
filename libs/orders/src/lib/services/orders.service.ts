import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@env/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  apiUrlOrders = environment.apiUrl + 'orders';
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
}
