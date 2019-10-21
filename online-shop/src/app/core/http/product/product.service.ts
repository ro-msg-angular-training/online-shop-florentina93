import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../../../shared/types';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL = 'http://localhost:3000/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiURL}products`)
      .pipe(retry(1));

  }
  getProduct(id: number): Observable<Product> {
   return this.httpClient.get<Product>(`${this.apiURL}products/${id}`);
  }
  deleteProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.apiURL}products/${id}`, this.httpOptions)
      .pipe(retry(1));
  }
  editProduct(product: Product): Observable<Product> {
    const id = product.id;
    return this.httpClient.put<Product>(`${this.apiURL}products/${id}`, product, this.httpOptions)
        .pipe(retry(1));
  }
  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiURL}products`, product).pipe(retry(1));
  }
}
