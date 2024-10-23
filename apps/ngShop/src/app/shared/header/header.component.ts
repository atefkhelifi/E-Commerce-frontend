import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { ProductsSearchComponent } from '@frontend/products';

@Component({
  selector: 'ngshop-header',
  standalone: true,
  imports: [NavComponent, ProductsSearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
