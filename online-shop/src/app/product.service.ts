import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './types';
import mockData from '../assets/products.json';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(Object.values(mockData));
  }
  getProduct(): Observable<Product> {
    return of(Object.values(mockData)[0]);
  }
}
