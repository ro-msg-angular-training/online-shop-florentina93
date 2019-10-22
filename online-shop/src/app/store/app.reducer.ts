import * as fromProducts from '../modules/products/store/product.reducer';
import * as fromAuth from '../modules/auth/store/auth.reducer';


import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
  productList: fromProducts.IState;
  productDetail: fromProducts.IState;
  auth: fromAuth.IState;
}

export const appReducer: ActionReducerMap<IAppState> = {
  productList: fromProducts.productReducer,
  productDetail: fromProducts.productReducer,
  auth: fromAuth.authReducer
};
