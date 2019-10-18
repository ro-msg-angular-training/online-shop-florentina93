import { Injectable } from '@angular/core';
import { Product, CartItem, Order, ProductOrder } from './types';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartItems: CartItem[] = [];

  constructor(private httpClient: HttpClient) { }

  addCartItem(inputProduct: Product): void {
    const foundCartItem: CartItem = this.cartItems.find(item => item.productId === inputProduct.id);
    if (foundCartItem) {
      foundCartItem.quantity++;
    } else {
      const newCartItem: CartItem = { productId: inputProduct.id, quantity: 1, product: inputProduct};
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
  resetShoppingCartList() {
    this.cartItems = [];
  }

  createNewOrder(productsArr: ProductOrder[]): Observable<any> {
    const body = {
      customer: 'doej',
      products: productsArr
    };
    console.log(body);
    return this.httpClient.post<any>('http://localhost:3000/orders', body)
      .pipe(map(response => {
        if (response) {
          console.log(response);
        }
        return response;
      }), catchError(errorResponse => throwError(errorResponse)));
  }
}
