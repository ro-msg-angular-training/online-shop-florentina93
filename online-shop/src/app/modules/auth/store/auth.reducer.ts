import { User } from 'src/app/shared/types';
import * as AuthActions from './auth.actions';

export interface IState {
  user: User;
  loading: boolean;
  authError: string;
}

const initialState: IState = {
  user: null,
  loading: false,
  authError: null
};

export function authReducer(state: IState = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload.error,
        loading: false
      };
    default:
      return state;
  }
}
