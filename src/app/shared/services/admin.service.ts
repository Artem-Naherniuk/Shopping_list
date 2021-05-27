import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private dbPath: string = '';

  constructor(private http: HttpClient) {
    this.dbPath = 'http://localhost:3000/products';
  }

  getProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.dbPath);
  };

  postProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.dbPath, product);
  };

  putProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.dbPath}/${product.id}`, product);
  };

  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.dbPath}/${id}`);
  }
  



}
