import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, public router: Router) {}

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    if (!user?.token) return false;

    try {
      const payload = JSON.parse(atob(user.token.split('.')[1]));
      const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role === 'Admin';
    } catch (error) {
      console.error('שגיאה בפענוח הטוקן:', error);
      return false;
    }
  }

  login(credentials: any): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/Auth/login`, credentials).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }),
      catchError(error => {
        console.error('שגיאה בהתחברות:', error);
        return throwError(() => error);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/register`, userData).pipe(
      tap(() => {
        console.log('הרשמה הצליחה');
      }),
      catchError(error => {
        console.error('שגיאה בהרשמה:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    try {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('שגיאה בהתנתקות:', error);
    }
  }
}