import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // שליפת המשתמש הנוכחי מה-localStorage (דרך ה-Service)
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const token = currentUser?.token;

  // אם יש Token, נשכפל את הבקשה ונוסיף לה Header של Authorization
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // אם אין Token, הבקשה ממשיכה כמו שהיא
  return next(req);
};