import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { User } from 'src/app/shared/types';

fdescribe('AuthService: ', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    });
  }));

  fdescribe(':', () => {
    function setup() {
      const authService = TestBed.get(AuthService);
      const httpTestingController = TestBed.get(HttpTestingController);
      return {authService, httpTestingController};
    }
    fit('should be created and return expected user', () => {
      const {authService, httpTestingController} = setup();
      const expectedUser = {username: 'doej', fullname: 'John Doe', roles: ['user', 'customer']};
      authService.login('doej', 'password').subscribe(response => {
        expect(response).toEqual(expectedUser);
      });
      const req = httpTestingController.expectOne('http://localhost:3000/login');
      expect(req.request.method).toBe('POST');
      expect(authService).toBeTruthy();

      req.flush({
        response: expectedUser
      });
    });

    afterEach(() => {
      const {httpTestingController} = setup();
      httpTestingController.verify();
    });

  });

});
