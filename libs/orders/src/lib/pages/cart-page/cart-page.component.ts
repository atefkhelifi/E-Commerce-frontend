import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { CartItemDetailed } from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'users-cart-page',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    InputNumberModule,
    OrderSummaryComponent,
    FormsModule,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit, OnDestroy {
  endSubs$: Subject<any> = new Subject();

  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}
  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  ngOnInit(): void {
    this._getCartDetails();
  }
  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.cartItemsDetailed = [];
      this.cartCount = cart?.items?.length ?? 0;
      cart?.items?.forEach((item) => {
        this.ordersService
          .getProduct(item?.productId || '')
          .subscribe((product) => {
            this.cartItemsDetailed.push({
              product: product,
              quantity: item.quantity,
            });
          });
      });
    });
  }
  backToShop() {
    this.router.navigate(['/products']);
  }
  removeFromCart(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
  }

  updateCartItemQuantity(event: any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value,
      },
      true
    );
  }
}
