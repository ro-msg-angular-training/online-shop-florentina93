import { Injectable } from '@angular/core';
import { Product, CartItem, Order } from './types';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

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

  createNewOrder(bodyOrder: Order) {
    return this.httpClient.post<{ name: string }>('http://localhost:3000/orders', bodyOrder)
      .pipe(retry(1),
      catchError(errorResp => {
        return throwError(errorResp);
      }));
  }
}
