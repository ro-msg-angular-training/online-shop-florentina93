import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, User, Role } from '../../../shared/types';
import { AuthService } from '../../../core/http/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as ProductActions from '../store/product.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private products: Product[];
  private isCustomer = false;
  private isAdmin = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.IAppState>) { }

  ngOnInit() {
    this.initProductList();
    const user: User = this.authService.getCurrentUser();
    if (user) {
      const foundAdminRole = user.roles.find(role => role === Role.ADMIN);
      const foundCustomerRole = user.roles.find(role => role === Role.CUSTOMER);
      if (foundAdminRole) {
        this.isAdmin = true;
      }
      if (foundCustomerRole) {
        this.isCustomer = true;
      }
    }
  }

  initProductList(): void {
    this.store.dispatch(new ProductActions.LoadProductsBegin());
    this.subscription.add(this.store.select(state => state.productState).subscribe(data => this.products = data.products));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
