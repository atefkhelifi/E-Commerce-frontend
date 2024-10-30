import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { BadgeModule } from 'primeng/badge';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'users-cart-badge',
  standalone: true,
  imports: [BadgeModule, RouterLink],
  templateUrl: './cart-badge.component.html',
  styleUrl: './cart-badge.component.scss',
})
export class CartBadgeComponent implements OnInit {
  cartCount = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart.items?.length ?? 0;
    });
    //  this.cartCount = this.cartService.getCart().items?.length ?? 0;
  }
}
