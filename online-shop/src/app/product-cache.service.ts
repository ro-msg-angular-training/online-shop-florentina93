import { Injectable } from '@angular/core';
import { Product } from './shared/types';
import { normalize } from 'normalizr';
import * as productSchema from './product-schema';

export interface INormalizedProduct {
  [key: number]: Product;
}

export interface INormalizedProducts {
  entities: {products: INormalizedProduct};
}

@Injectable({
  providedIn: 'root'
})
export class ProductCacheService {

  constructor() { }

  public static normalizeProduct(product: Product): INormalizedProducts {
    return normalize(product, productSchema);
  }
}
