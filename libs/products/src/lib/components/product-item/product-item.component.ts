import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-product-item',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product!: Product;
}
