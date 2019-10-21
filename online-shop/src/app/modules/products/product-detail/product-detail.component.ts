import { Component, OnInit } from '@angular/core';
import { Product, User, Role } from '../../../shared/types';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../../core/http/product/product.service';
import { AuthService } from '../../../core/http/auth/auth.service';
import { CartService } from '../../../core/services/cart.service';

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
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private location: Location
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
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }

  addToShoppingCart(product: Product) {
    this.cartService.addCartItem(product);
    alert('Product added to shopping cart!');
  }

  onDeleteProduct(id: number) {
    if (confirm('Are you sure you want to remove product ' + this.product.name)) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.cartService.deleteCartItem(this.product);
        this.location.back();
      });
    }
  }

  onEditProduct(id: number) {
    this.router.navigateByUrl('/product-edit/' + id);
  }
}
