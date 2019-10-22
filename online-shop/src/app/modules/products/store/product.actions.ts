import { Action } from '@ngrx/store';
import { Product } from 'src/app/shared/types';

export const LOAD_PRODUCTS_BEGIN = 'Load Products Begin';
export const LOAD_PRODUCTS_SUCCESS = 'Load Products Success';
export const GET_PRODUCT = 'Get Product';
export const GET_PRODUCT_SUCCESS = 'Get Product Success';
export const ADD_PRODUCT = 'Add Product';
export const ADD_PRODUCT_SUCCESS = 'Add Product Success';
export const EDIT_PRODUCT = 'Edit Product';
export const EDIT_PRODUCT_SUCCESS = 'Edit Product Success';
export const DELETE_PRODUCT = 'Delete Product';
export const DELETE_PRODUCT_SUCCESS = 'Delete Product Success';

export class LoadProductsBegin implements Action {
  readonly type = LOAD_PRODUCTS_BEGIN;
}

export class LoadProductsSuccess implements Action {
  readonly type = LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: { products: Product[]}) { }
}

export class GetProduct implements Action {
  readonly type = GET_PRODUCT;
  constructor(public payload: { id: number }) { }
}
export class GetProductSuccess implements Action {
  readonly type = GET_PRODUCT_SUCCESS;
  constructor(public payload: { product: Product }) { }
}

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payload: Product) { }
}

export class AddProductSuccess implements Action {
  readonly type = ADD_PRODUCT_SUCCESS;
  constructor(public payload: Product) { }
}

export class EditProduct implements Action {
  readonly type = EDIT_PRODUCT;
  constructor(public payload: { id: number, product: Product }) { }
}

export class EditProductSuccess implements Action {
  readonly type = EDIT_PRODUCT_SUCCESS;
  constructor(public payload: { id: number, product: Product }) { }

}

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;
  constructor(public payload: number) { }
}

export class DeleteProductSuccess implements Action {
  readonly type = DELETE_PRODUCT_SUCCESS;
  constructor(public payload: number) { }
}

// union type which combines all the actions
export type ProductActionsUnion = LoadProductsBegin
| LoadProductsSuccess | GetProductSuccess
| AddProductSuccess | EditProductSuccess
| DeleteProductSuccess;
