import { Product } from 'src/app/shared/types';
import * as ProductListActions from './product.actions';

export interface IState {
  products: Product[];
  productDetail: Product;
  editedProduct: Product;
  editedProductIndex: number;
  loading: boolean;
}

const initialState: IState = {
  products: [],
  productDetail: null,
  editedProduct: null,
  editedProductIndex: -1,
  loading: false
};

export function productReducer(state: IState = initialState, action: ProductListActions.ProductActionsUnion) {
  switch (action.type) {
    case ProductListActions.LOAD_PRODUCTS_BEGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case ProductListActions.LOAD_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        products: action.payload.products
      };
    }
    case ProductListActions.GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        productDetail: action.payload.product
      };
    }
    case ProductListActions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case ProductListActions.EDIT_PRODUCT_SUCCESS:
      const product = state.products.find(product => product.id === action.payload.id);
      const productIndex = state.products.findIndex(product => product.id === action.payload.id);
      const updatedProduct = {...product, ...action.payload.product};
      const updatedProducts = [...state.products];
      updatedProducts[productIndex] = updatedProduct;
      return {
        ...state,
        products: updatedProducts,
        productDetail: action.payload.product
      };
    case ProductListActions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(( product ) => {
          return product.id !== action.payload;
        })
      };
    default:
      return state;
  }
}
