import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject } from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  // constructor() { }

  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart || !cart.items) {
      const initialCart = {
        items: [],
      };
      localStorage.setItem(CART_KEY, JSON.stringify(initialCart));
    }
  }

  getCart(): Cart {
    const cartJsonString: string = localStorage.getItem(CART_KEY) || '{}';
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCareteItem?: boolean): Cart {
    const cart = this.getCart();
    const existingItem = cart.items?.find(
      (item) => item.productId === cartItem.productId
    );
    if (existingItem) {
      cart.items?.map((item: any) => {
        if (item.productId === cartItem.productId) {
          if (updateCareteItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = (item.quantity ?? 0) + (cartItem.quantity ?? 0);
          }
          return item;
        }
      });
    } else {
      cart.items?.push(cartItem);
    }
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJSON);
    this.cart$.next(cart);
    return cart;
  }
  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart = cart?.items?.filter((item) => {
      return item.productId != productId;
    });
    cart.items = newCart;
    const cartJSON = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJSON);
    this.cart$.next(cart);
  }
}
