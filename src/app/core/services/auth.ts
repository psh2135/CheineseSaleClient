import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(
    JSON.parse(localStorage.getItem('currentUser') || 'null')
  );
  
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, public router:Router) {}
  isAdmin(): boolean {

    const token = localStorage.getItem('token');

    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.role === 'Admin';
  }
  login(credentials: any) {
    return this.http.post<User>(`${environment.apiUrl}/Auth/login`, credentials).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  register(userData: any) {
    return this.http.post(`${environment.apiUrl}/Auth/register`, userData);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // window.location.reload();
    this.router.navigate(['/']);
  }
}