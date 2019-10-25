import { Action } from '@ngrx/store';
import { CartItem, Product, ProductOrder, Order } from 'src/app/shared/types';

export const GET_CART_ITEMS = 'Get Cart Items';
export const GET_CART_ITEMS_SUCCESS = 'Get Cart Items Success';
export const ADD_CART_ITEM = 'Add Cart Item';
export const ADD_CART_ITEM_SUCCESS = 'Add Cart Item Success';
export const DELETE_CART_ITEM = 'Delete Cart Item';
export const DELETE_CART_ITEM_SUCCESS = 'Delete Cart Item Success';
export const UPDATE_CART_ITEMS = 'Update Cart Items';
export const CHECKOUT_CART_ITEMS = 'Checkout Cart Items';
export const CHECKOUT_CART_ITEMS_SUCCESS = 'Checkout Cart Items Success';
export const CHECKOUT_CART_ITEMS_FAIL = 'Checkout Cart Items Fail';

export class GetCartItems implements Action {
  readonly type = GET_CART_ITEMS;
}

export class GetCartItemsSuccess implements Action {
  readonly type = GET_CART_ITEMS_SUCCESS;

  constructor(public payload: {cartItems: CartItem[]}) {}
}

export class AddCartItem implements Action {
  readonly type = ADD_CART_ITEM;
  constructor(public payload: {product: Product}) {}
}

export class AddCartItemSuccess implements Action {
  readonly type = ADD_CART_ITEM_SUCCESS;
  constructor(public payload: {cartItem: CartItem}) {}
}

export class DeleteCartItem implements Action {
  readonly type = DELETE_CART_ITEM;
  constructor(public payload: {product: Product}) {}
}

export class DeleteCartItemSuccess implements Action {
  readonly type = DELETE_CART_ITEM_SUCCESS;
  constructor(public payload: {id: number}) {}
}

export class UpdateCartItems implements Action {
  readonly type = UPDATE_CART_ITEMS;
  constructor(public payload: {product: Product}) {}
}

export class CheckoutCartItems implements Action {
  readonly type = CHECKOUT_CART_ITEMS;
  constructor(public payload: {productsOrder: ProductOrder[]}) {}
}

export class CheckoutCartItemsSuccess implements Action {
  readonly type = CHECKOUT_CART_ITEMS_SUCCESS;
}

export class CheckoutCartItemsFail implements Action {
  readonly type = CHECKOUT_CART_ITEMS_FAIL;
  constructor(public payload: {errorStatus: number}) {}
}

export type ShoppingCartActionsUnion = GetCartItemsSuccess | AddCartItemSuccess
| DeleteCartItemSuccess | UpdateCartItems | CheckoutCartItemsSuccess | CheckoutCartItemsFail;
