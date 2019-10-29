import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product, User, Role } from '../../../shared/types';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/http/auth/auth.service';
import { Store } from '@ngrx/store';
import * as ProductActions from '../store/product.actions';
import * as ShoppingCartActions from '../../shopping-cart/store/shopping-cart.actions';
import * as fromApp from '../../../store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  private product: Product;
  private isCustomer = false;
  private isAdmin = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store: Store<fromApp.IAppState>
  ) {}

  ngOnInit() {
    this.initProduct();
    this.isAdmin = this.authService.isAdmin();
    this.isCustomer = this.authService.isCustomer();
  }

  initProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new ProductActions.GetProduct({id}));
    this.subscription.add(
      this.store.select(state => state.productState.productDetail)
                .subscribe(data => this.product = data));
  }

  addToShoppingCart(product: Product) {
    this.store.dispatch(new ShoppingCartActions.AddCartItem({product}));
    alert('Product added to shopping cart!');
  }

  onDeleteProduct(id: number) {
    if (confirm('Are you sure you want to remove product ' + this.product.name)) {
      this.store.dispatch(new ProductActions.DeleteProduct(id));
      this.store.dispatch(new ShoppingCartActions.DeleteCartItem({product: this.product}));
    }
  }

  onEditProduct(id: number) {
    this.router.navigateByUrl(`/product-edit/${id}`);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
