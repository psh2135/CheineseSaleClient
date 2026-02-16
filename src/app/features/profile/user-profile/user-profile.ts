import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../core/models/user.model';
import { CartService, CartItem } from '../../../core/services/cart';
import { Order } from '../../../core/models/cart.model';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, TagModule, ButtonModule, RippleModule],
  templateUrl: './user-profile.html',
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  
  orderHistory: Order[] = [];

  constructor(private authService: AuthService, public cartService: CartService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(u => this.user = u);
    if(this.user) this.loadOrderHistory();
  }

  loadOrderHistory() {
    this.cartService.getMyTickets().subscribe({
      next: (data) => {
        this.orderHistory = data;
      },
      error: (err) => {
        console.error('שגיאה בטעינת ההיסטוריה', err);
      }
    });
  }
  getSeverity(status: string): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    switch (status) {
      case 'SUCCESS': 
        return 'success';
      case 'PENDING': 
        return 'warn';
      default: 
        return 'danger';
    }
}
}