import { Component, OnInit } from '@angular/core';
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
export class CheckoutPageComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder) {}
  form: FormGroup = new FormGroup({});
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId = '';
  countries: any = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCountries();
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
  }

  get checkoutForm() {
    return this.form.controls;
  }
}
