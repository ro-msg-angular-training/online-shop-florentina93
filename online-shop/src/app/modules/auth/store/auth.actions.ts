import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/types';

// identifiers
export const LOGIN_START = 'Login Start';
export const LOGIN_SUCCESS = 'Login Success';
export const LOGIN_FAIL = 'Login Fail';

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: {username: string, password: string}) {}
}
export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: {user: User}) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: {error: string}) {}
}

export type AuthActions = LoginStart | LoginSuccess | LoginFail;
