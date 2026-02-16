import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order, Ticket } from '../models/cart.model';



export interface Gift {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = `${environment.apiUrl}/cart`;
  private rawItemsSubject = new BehaviorSubject<Gift[]>([]);
  rawItems$ = this.rawItemsSubject.asObservable();

  groupedItems$ = this.rawItems$.pipe(
    map(items => this.groupItems(items))
  );


  // כמות כוללת של כרטיסים
  public count$ = this.rawItems$.pipe(
    map(items => items.length)
  );

  // מחיר כולל
  public totalPrice$ = this.rawItems$.pipe(
    map(items =>
      items.reduce((sum, item) => sum + (item.price || 0), 0)
    )
  );

  constructor(private http: HttpClient) {
    this.refreshCart();
  }

  refreshCart(): void {
    this.http.get<Gift[]>(`${this.apiUrl}/cart`)
      .subscribe({
        next: items => this.rawItemsSubject.next(items || []),
        error: err => {
          console.error('שגיאה בטעינת הסל', err);
          this.rawItemsSubject.next([]);
        }
      });
  }

  addToCart(giftId: number) {
    return this.http.post(`${this.apiUrl}/add`, { giftId }).pipe(
      tap(() => {
        const current = this.rawItemsSubject.value;

        const gift = current.find(g => g.id === giftId);
        if (!gift) return;

        this.rawItemsSubject.next([...current, gift]);
      })
    );
  }

  removeFromCart(giftId: number) {
    return this.http.delete(`${this.apiUrl}/remove`, {
      body: { giftId }
    }).pipe(
      tap(() => {
        const current = [...this.rawItemsSubject.value];
        const index = current.findIndex(g => g.id === giftId);

        if (index >= 0) {
          current.splice(index, 1);
          this.rawItemsSubject.next(current);
        }
      })
    );
  }



  checkout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, {}).pipe(
      tap(() => {
        this.refreshCart();
        
  })
    );
  }

  clearLocalCart() {
    this.rawItemsSubject.next([]);
  }



  getMyTickets(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/my-tickets`).pipe(
      tap(data => {
        console.log('הנתונים שחזרו מהשרת:', data);
      }),
    
      catchError(error => {
        console.error('קרתה שגיאה בשליפת הנתונים:', error);
       
        return throwError(() => error);
      })
    );
  }

  // ===== Helpers =====

  private groupItems(items: Gift[]): CartItem[] {
    const map = new Map<number, CartItem>();

    items.forEach(item => {
      if (map.has(item.id)) {
        map.get(item.id)!.quantity++;
      } else {
        map.set(item.id, {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        });
      }
    });

    return Array.from(map.values());
  }
  removeAllOfGift(giftId: number, quantity: number) {
    const requests = [];

    for (let i = 0; i < quantity; i++) {
      requests.push(
        this.removeFromCart(giftId)
      );
    }

    return Promise.all(requests.map(r => r.toPromise()));
  }

}
