import { Injectable } from '@angular/core';
import { Product, CartItem } from './types';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartItems: CartItem[] = [];

  constructor() { }

  addCartItem(inputProduct: Product): void {
    const foundCartItem: CartItem = this.cartItems.find(item => item.product === inputProduct);
    if (foundCartItem) {
      foundCartItem.quantity++;
    } else {
      const newCartItem: CartItem = { quantity: 1, product: inputProduct };
      this.cartItems.push(newCartItem);
    }
  }
  deleteCartItem(inputProduct: Product): void {
    const foundCartItemIndex = this.cartItems.findIndex(item => item.product === inputProduct);
    if (foundCartItemIndex !== undefined) {
      this.cartItems.splice(foundCartItemIndex, 1);
    }
    console.log(this.cartItems);
  }

  getCartItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }
}
