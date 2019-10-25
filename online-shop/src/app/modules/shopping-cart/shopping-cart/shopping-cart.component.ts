import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem, Product, ProductOrder } from '../../../shared/types';
import { Location } from '@angular/common';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as ShoppingCartActions from '../store/shopping-cart.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  private cartItems: CartItem[];
  private errorMessage: string = null;
  private emptyShoppingCart = true;
  private checkoutDone = false;
  private subscription: Subscription = new Subscription();

  constructor( private location: Location,
               private store: Store<fromApp.IAppState>) { }

  ngOnInit() {
    this.initShoppingCartList();
  }

  initShoppingCartList(): void {
    this.store.dispatch(new ShoppingCartActions.GetCartItems());
    this.subscription.add(this.store.select(state => state.cartState.cartItems).subscribe(data => {
      this.cartItems = data;
      console.log(data);
    }));
    if (this.cartItems.length > 0) {
      this.emptyShoppingCart = false;
    }
  }
  deleteFromShoppingCart(product: Product): void {
    this.store.dispatch(new ShoppingCartActions.DeleteCartItem({product}));
    if (this.cartItems.length === 0) {
      this.emptyShoppingCart = true;
    }
  }

  // Needs refactoring after fix the error
  // Unexpected token C in JSON at position 0 at JSON.parse (<anonymous>)
  onCheckoutClick() {
    const productsArr: ProductOrder[] = [];
    this.cartItems.forEach(item => {
      productsArr.push({ productId: +item.productId, quantity: item.quantity });
    });
    this.store.dispatch(new ShoppingCartActions.CheckoutCartItems({ productsOrder: productsArr }));
    this.subscription.add(this.store.select(state => state.cartState).subscribe(data => {
      if (data.errorStatus) {
        if (data.errorStatus === 201) {
          this.checkoutDone = true;
        } else {
          this.errorMessage = this.getErrorMessageByStatus(data.errorStatus);
        }
        this.emptyShoppingCart = true;
      }
    }));
    console.log(this.cartItems);
  }

  goBack() {
    this.location.back();
  }

  private getErrorMessageByStatus(status: number): string {
    switch (status) {
      case 401: {
        return 'User or product not found';
      }
      default: {
        return 'An unknown error occured!';
      }
    }
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }
}
