// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({ providedIn: 'root' })
// export class AdminService {

//   url = 'https://localhost:7027/api';

//   constructor(private http: HttpClient) { }

//   getDashboard() {

//     return this.http.get<any>(`${this.url}/cart/dashboard-stats`);

//   }

//   getDonors() {

//     return this.http.get<any[]>(`${this.url}/Auth/donors`);

//   }

//   getGifts() {

//     return this.http.get<any[]>(`${this.url}/gifts`);

//   }

//   getGift(id: number) {

//     return this.http.get<any>(`${this.url}/gift/${id}`);

//   }

//   updateGift(gift: any) {

//     return this.http.put(`${this.url}/gift`, gift);

//   }

//   runLottery(id: number) {

//     return this.http.post(`${this.url}/lottery/run`, {id});

//   }

// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User, Winner } from '../models/user.model';
import { environment } from '../../../environments/environment';

export interface DashboardStats {
  totalUsers: number;
  totalTickets: number;
  totalRevenue: number;
  activeGifts: number;

  topGifts: TopGift[];
  salesByDay: SalesByDay[];
}

export interface TopGift {
  giftId: number;
  name: string;
  ticketsCount: number;
}

export interface SalesByDay {
  date: string;
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class AdminService {

  url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  // ===== DASHBOARD =====
  getDashboard(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.url}/cart/dashboard-stats`);
  }
  getWinners(): Observable<Winner[]> {
    return this.http.get<Winner[]>(`${environment.apiUrl}/Gifts/winners`).pipe(
      tap(data => console.log('זוכים:', data)),
      catchError(error => {
        console.error('שגיאה בשליפת זוכים:', error);
        return throwError(() => error);
      })
    );
  }
  // ===== DONORS =====

  
  getDonors() {
    console.log('Fetching donors from API...');

    return this.http.get<User[]>(`${this.url}/Auth/donors`).pipe(

      tap(data => console.log('Donors data:', data)),

      catchError(error => {
        console.error('Error fetching donors:', error);

        // חשוב: מחזיר מערך ריק במקום להפיל את האפליקציה
        return ([]);
      })
    );
  }


  updateDonor(id: number, donorData: Partial<User>): Observable<User> {
    return this.http
      .put<User>(`${this.url}/Auth/donor/${id}`, donorData)
      .pipe(
        tap(() => console.log('תורם עודכן בהצלחה')),
        catchError(error => {
          console.error('שגיאה בעדכון תורם:', error);
          return throwError(() => error);
        })
      );
  }


  deleteDonor(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/Auth/donor/${id}`)
      .pipe(
        tap(() => console.log('תורם נמחק בהצלחה')),
        catchError(error => {
          console.error('שגיאה במחיקת תורם:', error);
          return throwError(() => error);
        })
      );
  }

  // הוספת תורם
  addDonor(donorData: Partial<User>): Observable<User> {
    return this.http
      .post<User>(`${this.url}/Auth/add-donor`, donorData)
      .pipe(
        tap(() => console.log('תורם נוסף בהצלחה')),
        catchError(error => {
          console.error('שגיאה בהוספת תורם:', error);
          return throwError(() => error);
        })
      );
  }



  // ===== GIFTS =====
  getGifts() {
    return this.http.get<any[]>(`${this.url}/Gifts`);
  }

  getGift(id: number) {
    return this.http.get<any>(`${this.url}/gift/${id}`);
  }

  updateGift(gift: any) {
    return this.http.put(`${this.url}/gift`, gift);
  }

  // ===== LOTTERY =====
  runLottery(id: number) {
    return this.http.post(`${this.url}/lottery/run`, { id });
  }
}
