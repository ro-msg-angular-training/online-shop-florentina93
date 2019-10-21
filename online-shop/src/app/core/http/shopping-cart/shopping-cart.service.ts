import { Injectable } from '@angular/core';
import { CartItem, ProductOrder } from '../../../shared/types';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartItems: CartItem[] = [];

  constructor(private httpClient: HttpClient) { }

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
