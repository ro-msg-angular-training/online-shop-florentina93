import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as ShoppingCartActions from './shopping-cart.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart.service';
import { ShoppingCartService } from 'src/app/core/http/shopping-cart/shopping-cart.service';
import { of } from 'rxjs';


@Injectable()
export class ShoppingCartEffects {

  constructor(private actions$: Actions,
              private cartService: CartService,
              private shoppingCartService: ShoppingCartService) { }

  @Effect()
  addCartItem = this.actions$.pipe(
    ofType(ShoppingCartActions.ADD_CART_ITEM),
    switchMap((data: ShoppingCartActions.AddCartItem) =>
      this.cartService.addCartItem(data.payload.product)),
    map(cartItem => new ShoppingCartActions.AddCartItemSuccess({ cartItem }))
  );

  @Effect()
  postOrder = this.actions$.pipe(
    ofType(ShoppingCartActions.CHECKOUT_CART_ITEMS),
    switchMap((data: ShoppingCartActions.CheckoutCartItems) =>
      this.shoppingCartService.createNewOrder(data.payload.productsOrder)),
    map(response => new ShoppingCartActions.CheckoutCartItemsSuccess({ order: response })),
    catchError(error => {
      return of(new ShoppingCartActions.CheckoutCartItemsFail({ errorStatus: error.status }));
    })
  );

    // @Effect()
  // deleteCartItem = this.actions$.pipe(
  //   ofType(ShoppingCartActions.DELETE_CART_ITEM),
  //   switchMap((data: ShoppingCartActions.DeleteCartItem) =>
  //     this.cartService.deleteCartItem(data.payload.product)),
  //   map(response => new ShoppingCartActions.DeleteCartItemSuccess({ id: response }))
  // );
}
