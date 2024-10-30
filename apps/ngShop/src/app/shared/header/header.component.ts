import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ProductsSearchComponent } from '@frontend/products';
import { CartBadgeComponent, CartService } from '@frontend/orders';

@Component({
  selector: 'ngshop-header',
  standalone: true,
  imports: [NavComponent, ProductsSearchComponent, CartBadgeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private cartService: CartService) {
    this.cartService.initCartLocalStorage();
  }
}
