import { CartItem } from 'src/app/shared/types';
import * as ShoppingCartActions from './shopping-cart.actions';

export interface IState {
  cartItems: CartItem[];
  errorStatus: number;
  loading: boolean;
}

const initialState: IState = {
  cartItems: [],
  errorStatus: null,
  loading: false
};

export function shoppingCartReducers(state: IState = initialState, action: ShoppingCartActions.ShoppingCartActionsUnion) {

  switch (action.type) {
    case ShoppingCartActions.GET_CART_ITEMS_SUCCESS: {
      return {
        ...state,
        cartItems: action.payload.cartItems
      };
    }
    case ShoppingCartActions.ADD_CART_ITEM_SUCCESS: {
      const foundItemIndex = state.cartItems.findIndex(item => +item.productId === +action.payload.cartItem.productId);
      const updatedItems = [...state.cartItems];
      if (foundItemIndex > -1) {
        updatedItems[foundItemIndex] = action.payload.cartItem;
      } else {
        updatedItems.push(action.payload.cartItem);
      }
      return {
        ...state,
        cartItems: updatedItems
      };
    }
    case ShoppingCartActions.DELETE_CART_ITEM_SUCCESS: {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          return item.productId !== action.payload.id;
        })
      };
    }
    case ShoppingCartActions.UPDATE_CART_ITEMS: {
      const itemIndex = state.cartItems.findIndex(item => item.productId === action.payload.product.id);
      const updatedItems = [...state.cartItems];
      updatedItems[itemIndex].product = action.payload.product;
      return {
        ...state,
        cartItems: updatedItems
      };
    }
    case ShoppingCartActions.CHECKOUT_CART_ITEMS_SUCCESS: {
      return {
        ...state,
        cartItems: [],
        errorStatus: null
      };
    }
    case ShoppingCartActions.CHECKOUT_CART_ITEMS_FAIL: {
      return {
        ...state,
        cartItems: [], // remove this
        errorStatus: action.payload.errorStatus
      };
    }

    default:
      return state;
  }
}

