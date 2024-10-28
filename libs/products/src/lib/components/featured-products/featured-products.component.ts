import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'lib-featured-products',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './featured-products.component.html',
  styleUrl: './featured-products.component.scss',
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  endSubs$: Subject<any> = new Subject();
  constructor(private prodService: ProductsService) {}
  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }
  private _getFeaturedProducts() {
    this.prodService
      .getFeaturedProducts(4)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((prods) => {
        console.log(prods);
        this.products = prods;
      });
  }
}
