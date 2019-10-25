import * as fromProducts from '../modules/products/store/product.reducer';
import * as fromAuth from '../modules/auth/store/auth.reducer';
import * as fromShoppingCart from '../modules/shopping-cart/store/shopping-cart.reducer';


import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
  productState: fromProducts.IState;
  auth: fromAuth.IState;
  cartState: fromShoppingCart.IState;
}

export const appReducer: ActionReducerMap<IAppState> = {
  productState: fromProducts.productReducer,
  auth: fromAuth.authReducer,
  cartState: fromShoppingCart.shoppingCartReducers
};
