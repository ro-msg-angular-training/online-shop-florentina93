import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../shared/types';
import { Location } from '@angular/common';
import { ValidationService } from '../../../shared/service/validation.service';
import * as ProductActions from '../store/product.actions';
import * as ShoppingCartActions from '../../shopping-cart/store/shopping-cart.actions';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit, OnDestroy {

  product: Product;
  productForm: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private location: Location,
    private validation: ValidationService,
    private store: Store<fromApp.IAppState>) { }

  ngOnInit() {
    this.initProductForm();
  }

  initProductForm(): void {
    this.subscription.add(
      this.store.select(state => state.productState.productDetail)
                .subscribe(data => this.product = data));

    this.productForm = new FormGroup({
      name: new FormControl(this.product.name, Validators.required),
      category: new FormControl(this.product.category, Validators.required),
      image: new FormControl(this.product.image, Validators.required),
      price: new FormControl(this.product.price, [Validators.required, this.validation.priceValidation]),
      description: new FormControl(this.product.description, Validators.required)
    });

  }

  onSaveClick() {
    const formValues = this.productForm.value;
    this.product.name = formValues.name;
    this.product.category = formValues.category;
    this.product.price = formValues.price;
    this.product.image = formValues.image;
    this.product.description = formValues.description;

    this.store.dispatch(new ProductActions.EditProduct({id: this.product.id, product: this.product}));
    this.store.dispatch(new ShoppingCartActions.UpdateCartItems({product: this.product}));
  }

  onCancelClick() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
