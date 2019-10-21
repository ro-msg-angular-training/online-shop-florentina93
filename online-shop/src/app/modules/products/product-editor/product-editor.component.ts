import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../shared/types';
import { ProductService } from '../../../core/http/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ValidationService } from '../../../shared/service/validation.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit {
  product: Product;
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private location: Location,
    private validation: ValidationService) { }

  ngOnInit() {
    this.initProductForm();
  }

  initProductForm(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => {
        this.product = product;
        this.productForm = new FormGroup({
          name: new FormControl(product.name, Validators.required),
          category: new FormControl(product.category, Validators.required),
          image: new FormControl(product.image, Validators.required),
          price: new FormControl(product.price, [Validators.required, this.validation.priceValidation]),
          description: new FormControl(product.description, Validators.required)
        });
      });
  }

  onCancelClick() {
    this.location.back();
  }
  onSaveClick() {
    const formValues = this.productForm.value;
    this.product.name = formValues.name;
    this.product.category = formValues.category;
    this.product.price = formValues.price;
    this.product.image = formValues.image;
    this.product.description = formValues.description;
    console.log(this.product);
    this.productService.editProduct(this.product).subscribe(() => {
      this.cartService.updateCartItems(this.product);
      this.router.navigateByUrl('/products');
    });
  }

}
