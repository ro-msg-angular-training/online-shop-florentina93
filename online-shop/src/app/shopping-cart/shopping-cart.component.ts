import { Component, OnInit } from '@angular/core';
import { CartItem, Product } from '../types';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  private cartItems: CartItem[];

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
   this.initShoppingCartList();
  }

  initShoppingCartList(): void {
    this.shoppingCartService.getCartItems().subscribe(items => this.cartItems = items);
  }
  deleteFromShoppingCart(product: Product): void {
   this.shoppingCartService.deleteCartItem(product);
  }

}
