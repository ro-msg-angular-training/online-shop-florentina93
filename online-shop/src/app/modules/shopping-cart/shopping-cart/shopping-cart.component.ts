import { Component, OnInit } from '@angular/core';
import { CartItem, Product, ProductOrder } from '../../../shared/types';
import { ShoppingCartService } from '../../../core/http/shopping-cart/shopping-cart.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as ShoppingCartActions from '../store/shopping-cart.actions';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private cartItems: CartItem[];
  private errorMessage: string = null;
  private emptyShoppingCart = true;
  private checkoutDone = false;

  constructor(private shoppingCartService: ShoppingCartService,
              private cartService: CartService,
              private router: Router,
              private location: Location,
              private store: Store<fromApp.IAppState>) { }

  ngOnInit() {
    this.initShoppingCartList();
  }

  initShoppingCartList(): void {
    this.store.select('cartItems').subscribe(data => this.cartItems = data.cartItems);
    if (this.cartItems.length > 0) {
      this.emptyShoppingCart = false;
    }
  }
  deleteFromShoppingCart(product: Product): void {
    this.store.dispatch(new ShoppingCartActions.DeleteCartItemSuccess({ id: product.id }));
    if (this.cartItems.length === 0) {
      this.emptyShoppingCart = true;
    }
  }

  // Needs refactoring after fix the error
  // Unexpected token C in JSON at position 0 at JSON.parse (<anonymous>)
  onCheckoutClick() {
    const productsArr: ProductOrder[] = [];
    this.cartItems.forEach(item => {
      productsArr.push({ productId: item.productId, quantity: item.quantity });
    });
    this.store.dispatch(new ShoppingCartActions.CheckoutCartItems({ productsOrder: productsArr }));
    this.store.select('cartItems').subscribe(data => {
      if (data.errorStatus) {
        if (data.errorStatus === 201) {
          this.checkoutDone = true;
        } else {
          this.errorMessage = this.getErrorMessageByStatus(data.errorStatus);
        }
        this.emptyShoppingCart = true;
      }
    });
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
}
