import { Injectable } from '@angular/core';
import { Product, CartItem, Order } from './types';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartItems: CartItem[] = [];

  constructor(private httpClient: HttpClient) { }

  addCartItem(inputProduct: Product): void {
    const foundCartItem: CartItem = this.cartItems.find(item => item.product.id === inputProduct.id);
    if (foundCartItem) {
      foundCartItem.quantity++;
    } else {
      const newCartItem: CartItem = { quantity: 1, product: inputProduct };
      this.cartItems.push(newCartItem);
    }
  }

  deleteCartItem(inputProduct: Product): void {
    const foundCartItemIndex = this.cartItems.findIndex(item => item.product.id === inputProduct.id);
    if (foundCartItemIndex > -1) {
      this.cartItems.splice(foundCartItemIndex, 1);
    }
    console.log(this.cartItems);
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

  createNewOrder(bodyOrder: Order): Observable<Order> {
    const body = {
      customer: 'doej',
      products: [
        {
          productId: 2,
          quantity: 1
        }
      ]
    };
    return this.httpClient.post<Order>('http://localhost:3000/orders', body)
      .pipe(retry(1));
  }
}
