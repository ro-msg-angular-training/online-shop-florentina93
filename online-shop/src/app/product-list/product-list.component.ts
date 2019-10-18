import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product, User, Role } from '../types';
import { AuthService } from '../auth.service';
import { ResolveStart } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  private products: Product[];
  private isCustomer = false;
  private isAdmin = false;

  constructor(private productService: ProductService,
              private authService: AuthService) { }

  ngOnInit() {
    this.initProductList();
    const user: User = this.authService.getCurrentUser();
    if (user) {
     const foundAdminRole = user.roles.find(role => role === Role.ADMIN);
     const foundCustomerRole = user.roles.find(role => role === Role.CUSTOMER);
     if (foundAdminRole) {
      this.isAdmin = true;
     }
     if(foundCustomerRole) {
       this.isCustomer = true;
     }
    }
  }

  initProductList(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

}
