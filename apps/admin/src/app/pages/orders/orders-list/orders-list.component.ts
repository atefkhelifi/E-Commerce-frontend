// eslint-disable-next-line @nx/enforce-module-boundaries
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { OrdersService, Order } from '@frontend/orders';
import { TagModule } from 'primeng/tag';

import { ORDER_STATUS } from '../order.constatnts';
@Component({
  selector: 'admin-orders-list',
  standalone: true,
  imports: [
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    RouterLink,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    TagModule,
  ],
  providers: [ConfirmationService, MessageService],

  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss',
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus: any = ORDER_STATUS;
  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getOrders();
  }
  private _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
  deleteOrder(orderId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe({
          next: () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!',
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!',
            });
          },
        });
      },
      reject: () => {
        return;
      },
    });
  }
  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }
}
