import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProducts from './product.reducer';

export const getProductsState = createFeatureSelector<fromProducts.IState>('products');
export const getProductDetailState = createSelector(getProductsState,
  (state: fromProducts.IState) => state.productDetail);
