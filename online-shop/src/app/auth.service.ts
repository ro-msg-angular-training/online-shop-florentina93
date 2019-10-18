import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import { User } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/login', { username, password })
      .pipe(map(user => {
        if (user) {
          this.currentUser = user;
        }
        return user;
      }),
        catchError(errorResponse => throwError(errorResponse)));
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
