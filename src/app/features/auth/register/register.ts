// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../../../core/services/auth';

// // PrimeNG Imports
// import { CardModule } from 'primeng/card';
// import { InputTextModule } from 'primeng/inputtext';
// import { PasswordModule } from 'primeng/password';
// import { ButtonModule } from 'primeng/button';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [
//     CommonModule, 
//     FormsModule, 
//     RouterModule, 
//     CardModule, 
//     InputTextModule, 
//     PasswordModule, 
//     ButtonModule
//   ],
//   templateUrl: './register.html'
// })
// export class RegisterComponent {
//   userData = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: ''
//   };
  
//   loading: boolean = false;

//   constructor(private authService: AuthService, private router: Router) {}

//   onRegister() {
//     const payload = {
//       userName: `${this.userData.firstName} ${this.userData.lastName}`.trim(),
//       email: this.userData.email,
//       password: this.userData.password
//     };
//     this.loading = true;
//     this.authService.register(payload).subscribe({
//       next: (res) => {
//         console.log('ההרשמה הצליחה!', res);
//         this.router.navigate(['/login']); 
//       },
//       error: (err) => {
//         console.error('שגיאה בהרשמה:', err);
//         this.loading = false;
//         // כאן אפשר להוסיף הודעת שגיאה למשתמש
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

// PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule, 
    CardModule, 
    InputTextModule, 
    PasswordModule, 
    ButtonModule,
    ToastModule
  ],
  providers: [MessageService], 
  templateUrl: './register.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
    });
  }

  // פונקציית עזר לבדיקת תקינות שדה
  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'שימו לב', detail: 'יש למלא את כל השדות בצורה תקינה' });
      return;
    }

    const { firstName, lastName, email, password } = this.registerForm.value;
    const fullName = `${firstName} ${lastName}`.trim();

    // בדיקת אורך שם משולב לפי ה-DTO (מינימום 5)
    if (fullName.length < 5) {
      this.messageService.add({ severity: 'error', summary: 'שגיאה', detail: 'השם המלא חייב להכיל לפחות 5 תווים' });
      return;
    }

    const payload = { userName: fullName, email, password };
    this.loading = true;

    this.authService.register(payload).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'הצלחה!', detail: 'נרשמת בהצלחה, מעביר להתחברות...' });
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'שגיאה בהרשמה', detail: err.error?.message || 'משהו השתבש, נסה שוב' });
      }
    });
  }
}