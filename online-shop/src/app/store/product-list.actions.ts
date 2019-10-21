import { Action } from '@ngrx/store';
import { Product } from 'src/app/shared/types';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: Product) {}

}

export class EditProduct implements Action {
  readonly type = EDIT_PRODUCT;

  constructor(public payload: {index: number, product: Product}) {}

}

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;

  constructor(public payload: number) {}

}

// union type which combines AddProduct with AddProducts
export type ProductListActions = AddProduct | EditProduct | DeleteProduct;
