import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Order, OrdersService } from '@frontend/orders';
import { ORDER_STATUS } from '../order.constatnts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'admin-orders-detail',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    ToastModule,
    FieldsetModule,
    DropdownModule,
    FormsModule,
  ],
  providers: [MessageService],

  templateUrl: './orders-detail.component.html',
  styleUrl: './orders-detail.component.scss',
})
export class OrdersDetailComponent implements OnInit {
  order: Order = {};
  orderStatus: any = ORDER_STATUS;
  currentOrderId = '';
  orderStatuses: any = [];
  selectedStatus: any;
  constructor(
    private location: Location,
    private router: ActivatedRoute,
    private ordersService: OrdersService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }
  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key: any) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }
  private _getOrder() {
    this.router.params.subscribe((params) => {
      if (params['id']) {
        this.currentOrderId = params['id'];

        this.ordersService.getOrder(this.currentOrderId).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }
  onStatusChange(event: any) {
    this.ordersService
      .updateOrder(this.currentOrderId, { status: event.value })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order is updated',
          });
          timer(2000);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Order is not updated',
          });
        },
      });
  }
}
