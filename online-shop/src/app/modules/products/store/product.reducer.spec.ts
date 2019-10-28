import { productReducer, initialState } from './product.reducer';
import { LoadProductsBegin, LoadProductsSuccess } from './product.actions';
import { Product } from 'src/app/shared/types';

fdescribe('ProductReducer', () => {
  fit('should return the default state', () => {
    const action = {type: 'NOOP'} as any;
    const result = productReducer(undefined, action);
    expect(result).toBe(initialState);
  });

  fit('should toggle loading state', () => {
    const action = new LoadProductsBegin();
    const result = productReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: true
    });
  });

  fit('should load products to state', () => {
    const mockProduct: Product =  {
      id: 1,
      name: 'Notebook Basic 17',
      category: 'Laptops',
      price: 1249
    };
    const mockProductList: Product[] = [mockProduct];
    const action = new LoadProductsSuccess({products: mockProductList});
    const result = productReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      products: mockProductList
    });
  });
});
