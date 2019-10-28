import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

fdescribe('AuthService', () => {
  let authService: AuthService;
  let http: HttpClient;

  const mockExpectedUser = {username: 'doej', fullname: 'John Doe', roles: ['user', 'customer']};

  beforeEach( () => {
    authService = new AuthService(http);
    spyOn(authService, 'login').and.returnValue(of(mockExpectedUser));
  });

  fit('login should return expected user', (done: DoneFn) => {
    authService.login('doej', 'password').subscribe(response => {
      expect(response).toBe(mockExpectedUser);
      done();
    });
  });

});
