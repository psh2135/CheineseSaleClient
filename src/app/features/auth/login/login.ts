import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

// PrimeNG Imports - חובה עבור ה-Standalone
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule
  ],
  templateUrl: './login.html'
})
export class LoginComponent {
  // אובייקט לאחסון נתוני הטופס
  loginData = {
    email: '',
    password: ''
  };

  rememberMe: boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
        // כאן אפשר להוסיף התראה למשתמש שחובה למלא הכל
        return;
    }

    this.loading = true;

    this.authService.login(this.loginData).subscribe({
      next: (user) => {
        console.log('התחברות הצליחה!', user);
        this.loading = false;
        // ניווט לדף הבית אחרי התחברות מוצלחת
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('שגיאה בהתחברות:', err);
        this.loading = false;
        // טיפול בשגיאה (למשל הודעה על סיסמה שגויה)
        alert('שגיאה בהתחברות. בדוק את הפרטים ונסה שוב.');
      }
    });
  }
}