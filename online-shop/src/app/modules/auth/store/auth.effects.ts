import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/http/auth/auth.service';
import { of } from 'rxjs';
import { User } from 'src/app/shared/types';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.authService.login(authData.payload.username, authData.payload.password)
      .pipe(catchError(error => {
        // ...later implementation
        return of(new AuthActions.LoginFail({error: error.message}));
      }),
      map((resData: User) => {
        // ...
        // const userTest: User = resData;
        return new AuthActions.LoginSuccess({user: resData});
      }));
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap(() => {
      this.router.navigate(['/products']);
    })
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
