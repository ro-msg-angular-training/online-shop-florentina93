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
  getProduct(id: number): Observable<Product> {
    return of(Object.values(mockData).find(product => product.id === id));
  }

}
