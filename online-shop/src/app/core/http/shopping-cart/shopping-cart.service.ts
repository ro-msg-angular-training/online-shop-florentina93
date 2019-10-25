import { Injectable } from '@angular/core';
import { ProductOrder, Order } from '../../../shared/types';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ORDERS_URL } from 'src/app/shared/constants';
import { CartService } from '../../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private httpClient: HttpClient, private cartService: CartService) { }

  createNewOrder(productsArr: ProductOrder[]): Observable<Order> {
    const body = {
      customer: 'doej',
      products: productsArr
    };
    this.cartService.resetShoppingCartList();
    return this.httpClient.post<Order>(ORDERS_URL, body)
      .pipe(map(response => {
        if (response) {
          console.log(response);
        }
        return response;
      }), catchError(errorResponse => throwError(errorResponse)));
  }
}
