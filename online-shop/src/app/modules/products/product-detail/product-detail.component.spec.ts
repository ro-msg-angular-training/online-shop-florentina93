import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { NavigationExtras, Router, ActivatedRoute, Data, Params } from '@angular/router';
import { AuthService } from 'src/app/core/http/auth/auth.service';
import { provideMockStore } from '@ngrx/store/testing';
import * as fromApp from '../../../store/app.reducer';


fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  const mockRouter = {
    navigate(commands: any[], extras?: NavigationExtras) { }
  };
  const initialState = {
    productState: {
      productDetail: {
        id: 1,
        name: 'Notebook Basic 17',
        category: 'Laptops',
        image: 'https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg',
        price: 1249,
        description: 'Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro'
      }
  }
  } as fromApp.IAppState;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductDetailComponent,
        provideMockStore({initialState}),
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: {get: () => 1}}
          }
        },
        {
          provide: AuthService,
          useValue: {
            getCurrentUser: jasmine.createSpy()
          }
        },
      ],
      declarations: [ ProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create ProductDetailComponent', () => {
    expect(component).toBeDefined();
  });

  fit('should have <h2> ' + initialState.productState.productDetail.name, () => {
    const element = fixture.nativeElement;
    const h2 = element.querySelector('h2');
    const expectedText = 'Product: ' + initialState.productState.productDetail.name;
    expect(h2.textContent).toEqual(expectedText);
  });

  fit('should have <p> ' + initialState.productState.productDetail.description, () => {
    const element = fixture.nativeElement;
    const p = element.querySelector('p');
    expect(p.textContent).toEqual(initialState.productState.productDetail.description);
  });
});
