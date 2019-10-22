import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Product } from '../../../shared/types';
import { ValidationService } from '../../../shared/service/validation.service';
import { Store } from '@ngrx/store';
import * as ProductActions from '../store/product.actions';
import * as fromApp from '../../../store/app.reducer';



@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  addProductForm: FormGroup;

  constructor(
    private validation: ValidationService,
    private location: Location,
    private store: Store<fromApp.IAppState>) { }


  ngOnInit() {
    this.addProductForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, this.validation.priceValidation]),
      description: new FormControl(null, Validators.required)
    });
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
    this.store.dispatch(new ProductActions.AddProduct(product));
  }

  onCancelClick() {
    this.location.back();
  }
}
