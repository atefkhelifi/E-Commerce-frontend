import { InputNumberModule } from 'primeng/inputnumber';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from '@frontend/ui';

@Component({
  selector: 'lib-product-page',
  standalone: true,
  imports: [
    RatingModule,
    CommonModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    GalleryComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product!: Product;
  endSubs$: Subject<any> = new Subject();
  quantity!: number;

  constructor(
    private prodService: ProductsService,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this._getProduct(params['id']);
      }
    });
  }

  private _getProduct(id: string) {
    this.prodService
      .getProductId(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((product) => {
        this.product = product;
      });
  }
  addToCart() {
    console.log('test');
  }
}