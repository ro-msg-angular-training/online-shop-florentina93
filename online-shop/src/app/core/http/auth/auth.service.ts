import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { User } from '../../../shared/types';
import { LOGIN_URL } from 'src/app/shared/constants';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../../modules/auth/store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor(private httpClient: HttpClient, private store: Store<fromApp.IAppState>) { }

  login(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>(LOGIN_URL, { username, password })
      .pipe(map(user => {
        if (user) {
          this.currentUser = user;
          this.store.dispatch(new AuthActions.LoginSuccess({user: this.currentUser}));
        }
        return user;
      }),
        catchError(errorResponse => throwError(errorResponse)));
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
