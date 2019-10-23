import { Injectable } from '@angular/core';
import { CartItem, Product } from 'src/app/shared/types';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() { }

  addCartItem(inputProduct: Product): Observable<CartItem> {
    const foundCartItem: CartItem = this.cartItems.find(item => item.productId === inputProduct.id);
    if (foundCartItem) {
      foundCartItem.quantity++;
      return of(foundCartItem);
    } else {
      const newCartItem: CartItem = { productId: inputProduct.id, quantity: 1, product: inputProduct};
      this.cartItems.push(newCartItem);
      return of(newCartItem);
    }
  }

  deleteCartItem(inputProduct: Product): Observable<number> {
    const foundCartItemIndex = this.cartItems.findIndex(item => item.product.id === inputProduct.id);
    if (foundCartItemIndex > -1) {
      this.cartItems.splice(foundCartItemIndex, 1);
    }
    return of(inputProduct.id);
  }

  getCartItems(): Observable<CartItem[]> {
    return of(this.cartItems);
  }

  updateCartItems(product: Product) {
    const foundCartItem: CartItem = this.cartItems.find(item => item.product.id === product.id);
    if (foundCartItem) {
      foundCartItem.product = product;
    }
  }
  resetShoppingCartList() {
    this.cartItems = [];
  }
}
