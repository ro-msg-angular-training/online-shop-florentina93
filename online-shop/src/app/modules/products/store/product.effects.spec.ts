import { Observable, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { ProductEffects } from './product.effects';
import { ProductService } from 'src/app/core/http/product/product.service';
import { TestBed } from '@angular/core/testing';
import { Product } from 'src/app/shared/types';
import { LoadProductsBegin, LoadProductsSuccess } from './product.actions';
import { Router, NavigationExtras } from '@angular/router';

fdescribe('ProductEffects', () => {
  let actions: Observable<any>;
  let effects: ProductEffects;
  let productService: jasmine.SpyObj<ProductService>;
  const mockRouter = {
    navigate(commands: any[], extras?: NavigationExtras) {
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        ProductService,
        provideMockActions(() => actions),
        {
          provide: ProductService,
          useValue: {
            getProducts: jasmine.createSpy()
          }
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });
    effects = TestBed.get(ProductEffects);
    productService = TestBed.get(ProductService);
  });
  fdescribe('loadProducts', () => {
    fit('should return a stream with product list loaded action', () => {
      const mockProduct: Product =  {
        id: 1,
        name: 'Notebook Basic 17',
        category: 'Laptops',
        price: 1249
      };
      const productList: Product[] = [mockProduct];
      const action = new LoadProductsBegin();
      const outcome = new LoadProductsSuccess({products: productList});

      actions = hot('-a', {a: action});
      const response = cold('-a|', {a: productList});
      productService.getProducts.and.returnValue(response);

      const expected = cold('--b', {b: outcome});
      expect(effects.loadProducts).toBeObservable(expected);
    });
  });
});
