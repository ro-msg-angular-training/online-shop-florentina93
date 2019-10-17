import { Component, OnInit } from '@angular/core';
import { Product } from '../types';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private location: Location
  ) {}

  ngOnInit() {
    this.initProduct();
  }

  initProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  addToShoppingCart(product: Product) {
    this.shoppingCartService.addCartItem(product);
    alert('Product added to shopping cart!');
  }

  onDeleteProduct(id: number) {
    if (confirm('Are you sure you want to remove product ' + this.product.name)) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.shoppingCartService.deleteCartItem(this.product);
        this.location.back();
      });
    }
  }

  onEditProduct(id: number) {
    console.log('on edit' + id);
  }

  goBack(): void {
    this.location.back();
  }
}
