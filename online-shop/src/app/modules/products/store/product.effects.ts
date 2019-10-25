import { Actions, ofType, Effect } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { switchMap, map, tap } from 'rxjs/operators';
import { ProductService } from '../../../core/http/product/product.service';
import { Injectable } from '@angular/core';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/shared/types';
import { Router } from '@angular/router';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions,
              private productService: ProductService,
              private router: Router,
              private store: Store<fromApp.IAppState>) { }

  @Effect()
  loadProducts = this.actions$.pipe(
    ofType(ProductActions.LOAD_PRODUCTS_BEGIN),
    switchMap(() => this.productService.getProducts()),
    map(data => new ProductActions.LoadProductsSuccess({ products: data }))
  );

  @Effect()
  getProduct = this.actions$.pipe(
    ofType(ProductActions.GET_PRODUCT),
    switchMap((data: ProductActions.GetProduct) => this.productService.getProduct(data.payload.id)),
    map((responseData: Product) =>
      new ProductActions.GetProductSuccess({ product: responseData }))
  );

  @Effect()
  addProduct = this.actions$.pipe(
    ofType(ProductActions.ADD_PRODUCT),
    switchMap((data: ProductActions.AddProduct) => this.productService.addProduct(data.payload)),
    map(responseData => new ProductActions.AddProductSuccess(responseData)),
    tap(() => this.router.navigate(['/products'])));


  @Effect()
  editProduct = this.actions$.pipe(
    ofType(ProductActions.EDIT_PRODUCT),
    switchMap((data: ProductActions.EditProduct) => {
      return this.productService.editProduct(data.payload.product);
    }),
    map(() => new ProductActions.EditProductSuccess()),
    tap(() => this.router.navigate(['/products']))
  );

  @Effect()
  deleteProduct = this.actions$.pipe(
    ofType(ProductActions.DELETE_PRODUCT),
    switchMap((data: ProductActions.DeleteProduct) => {
      return this.productService.deleteProduct(data.payload)
        .pipe(map(() => new ProductActions.DeleteProductSuccess(data.payload)),
          tap(() => this.router.navigate(['/products'])));
    })
  );
}
