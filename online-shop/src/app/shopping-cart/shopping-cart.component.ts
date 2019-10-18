import { Component, OnInit } from '@angular/core';
import { CartItem, Product, Order, ProductOrder } from '../types';
import { ShoppingCartService } from '../shopping-cart.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

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

  constructor(private shoppingCartService: ShoppingCartService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.initShoppingCartList();
  }

  initShoppingCartList(): void {
    this.shoppingCartService.getCartItems().subscribe(items => this.cartItems = items);
    if (this.cartItems.length > 0) {
      this.emptyShoppingCart = false;
    }
  }
  deleteFromShoppingCart(product: Product): void {
    this.shoppingCartService.deleteCartItem(product);
  }

  // Needs refactoring after fix the error
  // Unexpected token C in JSON at position 0 at JSON.parse (<anonymous>)
  onCheckoutClick() {
    const productsArr: ProductOrder[] = [];
    this.cartItems.forEach(item => {
      productsArr.push({productId: item.productId, quantity: item.quantity});
    });
    this.shoppingCartService.createNewOrder(productsArr).pipe(first()).subscribe(
      response => {
        this.checkoutDone = true;
        this.emptyShoppingCart = true;
        console.log(response);
        this.router.navigateByUrl('/products');
      },
      error => {
        if (error.status === 201) {
          this.checkoutDone = true;
          this.emptyShoppingCart = true;
          this.shoppingCartService.resetShoppingCartList();
        }
        this.errorMessage = this.getErrorMessageByStatus(error.status);
        console.log(error);
      }
    );
    console.log(this.cartItems);
  }

  goBack() {
    this.location.back();
  }

  getErrorMessageByStatus(status: number): string {
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
