import { Component, OnInit } from '@angular/core';
import { CartItem, Product, Order, ProductOrder } from '../types';
import { ShoppingCartService } from '../shopping-cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private cartItems: CartItem[];

  constructor(private shoppingCartService: ShoppingCartService, private location: Location) { }

  ngOnInit() {
    this.initShoppingCartList();
  }

  initShoppingCartList(): void {
    this.shoppingCartService.getCartItems().subscribe(items => this.cartItems = items);
  }
  deleteFromShoppingCart(product: Product): void {
    this.shoppingCartService.deleteCartItem(product);
  }

  onCheckoutClick() {
    // This is for test
    const productsArr: ProductOrder[] = [];
    const product: ProductOrder = { productId: 1, quantity: 2 };
    productsArr.push(product);
    const mockOrder: Order = { customer: 'doej', products: productsArr };
    this.shoppingCartService.createNewOrder(mockOrder).subscribe();
    console.log(this.cartItems);
  }

}
