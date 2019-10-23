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

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) { }

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.authService.login(authData.payload.username, authData.payload.password)
        .pipe(
          map((resData: User) => {
            return new AuthActions.LoginSuccess({ user: resData });
          }),
          // tap(() => this.router.navigate(['/products'])),
          catchError(error => {
            // ...later implementation
            return of(new AuthActions.LoginFail({ error: error.message, errorStatus: error.status}));
          })
        );
    })
  );

}
