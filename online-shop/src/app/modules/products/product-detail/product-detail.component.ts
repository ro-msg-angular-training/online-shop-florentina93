import { Component, OnInit } from '@angular/core';
import { Product, User, Role } from '../../../shared/types';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/http/auth/auth.service';
import { Store } from '@ngrx/store';
import * as ProductActions from '../store/product.actions';
import * as ShoppingCartActions from '../../shopping-cart/store/shopping-cart.actions';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private product: Product;
  private isCustomer = false;
  private isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store: Store<fromApp.IAppState>
  ) {}

  ngOnInit() {
    this.initProduct();
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

  initProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new ProductActions.GetProduct({id}));
    this.store.select(state => state.productDetail).subscribe(data => this.product = data.productDetail);
  }

  addToShoppingCart(product: Product) {
    this.store.dispatch(new ShoppingCartActions.AddCartItem({product}));
    alert('Product added to shopping cart!');
  }

  onDeleteProduct(id: number) {
    if (confirm('Are you sure you want to remove product ' + this.product.name)) {
      this.store.dispatch(new ProductActions.DeleteProduct(id));
      this.store.dispatch(new ShoppingCartActions.DeleteCartItemSuccess({id}));
    }
  }

  onEditProduct(id: number) {
    this.router.navigateByUrl('/product-edit/' + id);
  }
}
