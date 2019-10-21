import { Product } from 'src/app/shared/types';
import * as ProductListActions from './product-list.actions';

export interface IState {
  products: Product[];
  editedProduct: Product;
  editedProductIndex: number;
}

export interface IAppState {
  productList: IState;
}

const initialState: IState = {
  products: [
    new Product(0, 'Notebook Basic 15', 'Laptops', 956),
    new Product(1, 'ITelO Vault', 'Accessories', 299)
  ],
  editedProduct: null,
  editedProductIndex: -1
};

export function productListReducer(state: IState = initialState, action: ProductListActions.ProductListActions) {
  switch (action.type) {
    case ProductListActions.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case ProductListActions.EDIT_PRODUCT:
      const product = state.products[action.payload.index];
      const updatedProduct = {...product, ...action.payload.product};
      const updatedProducts = [...state.products];
      updatedProducts[action.payload.index] = updatedProduct;
      return {
        ...state,
        products: updatedProducts
      };
    case ProductListActions.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
