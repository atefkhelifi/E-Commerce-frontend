import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { OrderItem } from '../../models/order-item';
import * as contriesLib from 'i18n-iso-countries';
import * as en from 'i18n-iso-countries/langs/en.json';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LocalStorageService, UsersService } from '@frontend/users';
import { Subject, takeUntil } from 'rxjs';
const ORDER_STATUS: { [key: string]: { label: string; color: string } } = {
  0: {
    label: 'Pending',
    color: 'primary',
  },
  1: {
    label: 'Processed',
    color: 'warning',
  },
  2: {
    label: 'Shipped',
    color: 'warning',
  },
  3: {
    label: 'Delivered',
    color: 'success',
  },
  4: {
    label: 'Failed',
    color: 'danger',
  },
};

@Component({
  selector: 'users-checkout-page',
  standalone: true,
  imports: [
    OrderSummaryComponent,
    CommonModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
    private us: UsersService,
    private localStorage: LocalStorageService
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
  form: FormGroup = new FormGroup({});
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = '6709560ca4366416033f3da0';
  countries: any = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._autoFillUserData();
    this._getCartItems();
    this._getCountries();
  }
  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems =
      cart?.items?.map((item) => {
        return {
          product: item.productId || {},
          quantity: item.quantity,
        };
      }) || [];
  }
  private _autoFillUserData() {
    this.userId = this.localStorage.getUserIdFromToken() || '';
    console.log(this.userId);

    this.us.getUserId(this.userId).subscribe((user: any) => {
      console.log(user);
      if (user) {
        this.form.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          country: user.country,
          zip: user.zip,
          apartment: user.apartment,
          street: user.street,
        });
      }
    });
  }

  private _initCheckoutForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  private _getCountries() {
    contriesLib.registerLocale(en);

    this.countries = Object.entries(
      contriesLib.getNames('EN', { select: 'official' })
    ).map((entry) => {
      return {
        name: entry[1],
        id: entry[0],
      };
    });
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.form.controls['street'].value,
      shippingAddress2: this.form.controls['apartment'].value,
      city: this.form.controls['city'].value,
      zip: this.form.controls['zip'].value,
      country: this.form.controls['country'].value,
      phone: this.form.controls['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };
    console.log(order);
    this.ordersService.createOrder(order).subscribe({
      next: () => {
        this.cartService.emptyCart();
        this.router.navigate(['/success']);
      },
    });
  }
}
