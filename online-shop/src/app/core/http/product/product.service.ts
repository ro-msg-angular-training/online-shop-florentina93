import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Product } from '../../../shared/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PRODUCTS_URL } from 'src/app/shared/constants';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(PRODUCTS_URL)
      .pipe(retry(1));

  }
  getProduct(id: number): Observable<Product> {
   return this.httpClient.get<Product>(`${PRODUCTS_URL}/${id}`);
  }
  deleteProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${PRODUCTS_URL}/${id}`, this.httpOptions)
      .pipe(retry(1));
  }
  editProduct(product: Product): Observable<Product> {
    const id = product.id;
    return this.httpClient.put<Product>(`${PRODUCTS_URL}/${id}`, product, this.httpOptions)
        .pipe(retry(1));
  }
  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${PRODUCTS_URL}`, product).pipe(retry(1));
  }
}
