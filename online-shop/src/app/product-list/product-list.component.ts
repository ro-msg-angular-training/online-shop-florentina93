import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../types';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.initProductList();
  }

  initProductList(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
  onSelectProduct(product: Product): void {
    this.selectedProduct = product;
  }
}
