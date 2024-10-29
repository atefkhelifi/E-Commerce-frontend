import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-products-list',
  standalone: true,
  imports: [ProductItemComponent, CommonModule, CheckboxModule, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  endSubs$: Subject<any> = new Subject();
  endSubsCat$: Subject<any> = new Subject();
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategories: any;
  isCategoryPage = true;
  constructor(
    private prodService: ProductsService,
    private categoryService: CategoriesService,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
    this.endSubsCat$.next(null);
    this.endSubsCat$.complete();
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      params['id'] ? this._getProducts([params['id']]) : this._getProducts();
      params['id']
        ? (this.isCategoryPage = true)
        : (this.isCategoryPage = false);
    });
    //this._getProducts();
    this._getCategories();
  }
  private _getProducts(categoryFilter?: any) {
    console.log(categoryFilter);
    this.prodService
      .getProducts(categoryFilter)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((products) => {
        this.products = products;
      });
  }
  private _getCategories() {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.endSubsCat$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((cat) => cat.checked)
      .map((cat) => cat.id);
    this._getProducts(selectedCategories);
  }
}
