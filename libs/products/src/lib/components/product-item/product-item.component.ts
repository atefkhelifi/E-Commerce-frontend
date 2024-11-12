import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CartItem, CartService } from '@frontend/orders';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'lib-product-item',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterLink, ToastModule],
  providers: [MessageService],

  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  addToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1,
    };
    this.cartService.setCartItem(cartItem);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${this.product.name} added to cart`,
    });
    timer(2000).toPromise();
  }
}
