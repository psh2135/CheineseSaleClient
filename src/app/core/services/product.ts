import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CreateProduct, Product } from '../models/product.model';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { Category } from '../models/category.model';

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

    return this.http.post(`${environment.apiUrl}/lottery/run`, { giftId: id });

  }
  updateProduct(product: Product) {

    return this.http.put(`${this.apiUrl}/${product.id}`, product);

  }
  addProduct(product: CreateProduct) {
    return this.http.post<CreateProduct>(
      `${this.apiUrl}`,
      product
    );
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiUrl}/Category`).pipe(
      tap(data => console.log('קטגוריות:', data)),
      catchError(error => {
        console.error('שגיאה בשליפת קטגוריות:', error);
        return throwError(() => error);
      })
    );
  }
  deleteProduct(id: number) {

    return this.http.delete(`${this.apiUrl}/${id}`);

  }
  getWinner(giftId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/winner/${giftId}`);
  }
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/Gifts/category/${categoryId}`).pipe(
      tap(data => console.log('מוצרים לפי קטגוריה:', data)),
      catchError(error => {
        console.error('שגיאה בשליפת מוצרים לפי קטגוריה:', error);
        return throwError(() => error);
      })
    );
  }
}