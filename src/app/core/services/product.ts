import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // נניח שזה ה-Endpoint שלך בשרת
  private apiUrl = `${environment.apiUrl}/Gifts`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  runLottery(id: number) {

    return this.http.post(`/api/products/run-lottery/${id}`, {});

  }
  updateProduct(product: Product) {

    return this.http.put(`/api/products/${product.id}`, product);

  }
  deleteProduct(id:number){

    return this.http.delete(`/api/products/${id}`);
    
    }
    
}