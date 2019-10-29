import { User } from 'src/app/shared/types';
import * as AuthActions from './auth.actions';

export interface IState {
  user: User;
  loading: boolean;
  fetchedUser: boolean;
  authError: string;
  authErrorStatus: number;
}

const initialState: IState = {
  user: null,
  loading: false,
  fetchedUser: false,
  authError: null,
  authErrorStatus: null
};

export function authReducer(state: IState = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        authError: null,
        authErrorStatus: null,
        loading: false,
        fetchedUser: true
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        authErrorStatus: null,
        loading: true
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload.error,
        authErrorStatus: action.payload.errorStatus,
        loading: false
      };
    default:
      return state;
  }
}
