import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../types';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  addProductForm: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private location: Location) { }


  ngOnInit() {
    this.addProductForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, this.priceValidation]),
      description: new FormControl(null, Validators.required)
    });
  }

  onCancelClick() {
    this.location.back();
  }
  onSaveClick() {
    const formValues = this.addProductForm.value;
    const product: Product = {
      id: 123,
      name: formValues.name,
      category: formValues.category,
      price: formValues.price,
      image: formValues.image,
      description: formValues.description
    };
    console.log(product);
    this.productService.addProduct(product).subscribe(() => {
      console.log('Created product');
      this.router.navigateByUrl('/products');
    });
  }

  priceValidation(formControl: FormControl): { [s: string]: boolean } {
    if (isNaN(formControl.value)) {
      return { thePriceIsNotNumber: true };
    }
    return null;
  }

}
