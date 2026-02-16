import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart';
import { AuthService } from '../../../core/services/auth';

// ייבוא רכיבי PrimeNG
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ToolbarModule, 
    ButtonModule, 
    BadgeModule
  ],
  templateUrl: './navbar.html',
  // styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAdmin = false;
  
  constructor(public cartService: CartService, public authService : AuthService) {
    this.isAdmin = this.authService.isAdmin();
  }


  
}