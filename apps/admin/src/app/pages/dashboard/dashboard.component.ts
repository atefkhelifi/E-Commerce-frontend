import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ProductsService } from '@frontend/products';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { OrdersService } from '@frontend/orders';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UsersService } from '@frontend/users';

import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  statistics: any = [];
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales(),
    ]).subscribe((values) => {
     // console.log(values);
      this.statistics = values;
    });
  }
}
