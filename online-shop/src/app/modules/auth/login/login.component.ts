import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/http/auth/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../../../shared/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  currentUser: User;
  errorMessage: string = null;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    this.authService.login(this.form.username.value, this.form.password.value)
      .pipe(first())
      .subscribe(
        user => {
          this.currentUser = user;
          console.log(user);
          this.isLoading = false;
          this.router.navigateByUrl('/products');
        },
        error => {
          this.errorMessage = this.getErrorMessageByStatus(error.status);
          this.isLoading = false;
        });
    console.log(this.form);
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

}
