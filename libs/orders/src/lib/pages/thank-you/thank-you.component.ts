import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { OrdersService } from '../../services/orders.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'users-thank-you',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.scss',
})
export class ThankYouComponent implements OnInit {
  constructor(
    private orderService: OrdersService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const orderData = this.orderService.getCachedOrderData();
    this.orderService.createOrder(orderData).subscribe(() => {
      this.cartService.emptyCart();
      this.orderService.clearCachedOrderData();
    });
  }
}
