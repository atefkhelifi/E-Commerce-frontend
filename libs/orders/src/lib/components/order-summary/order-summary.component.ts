import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'users-order-summary',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  endSubs$: Subject<any> = new Subject();
  totalPrice = 0;
  showCheckout = true;

  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  _getOrderSummary() {
    this.route.url.subscribe((urlSegments) => {
      // Convert urlSegments to a single string and check for 'checkout'
      const urlPath = urlSegments.map((segment) => segment.path).join('/');
      if (urlPath.includes('checkout')) {
        this.showCheckout = false;
      }
    });
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart?.items?.map((item) => {
          this.ordersService
            .getProduct(item?.productId || '')
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * (item.quantity ?? 0);
            });
        });
      }
    });
  }
  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
