import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = null;
  isLoading = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromApp.IAppState>,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }

  onLoginClick() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.subscriptions.add(this.store.dispatch(new AuthActions.LoginStart(
      { username: this.form.username.value,
        password: this.form.password.value
      }
    )));

    this.subscriptions.add(this.store.select(state => state.auth).subscribe(response => {
      if (response.fetchedUser) {
        this.isLoading = response.loading;
      }
      if (response.authErrorStatus) {
        this.errorMessage = this.getErrorMessageByStatus(response.authErrorStatus);
        this.isLoading = response.loading;
      }
    }));
  }

  private getErrorMessageByStatus(status: number): string {
    switch (status) {
      case 401: {
        return 'Username or password is incorrect';
      }
      default: {
        return 'An unknown error occured!';
      }
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
