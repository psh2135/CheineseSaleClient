import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './cart-page.html'
})
export class CartPageComponent {
  groupedItems$: Observable<CartItem[]>;
  totalPrice$: Observable<number>;

  isLoading = false;

  constructor(public cartService: CartService, public router: Router) {
    this.groupedItems$ = this.cartService.groupedItems$;
    this.totalPrice$ = this.cartService.totalPrice$;
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    this.isLoading = true;

    this.cartService.addToCart(item.id).subscribe({
      next: () => this.isLoading = false,
      error: () => {
        item.quantity--;
        this.isLoading = false;
      }
    });
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity <= 0) return;

    item.quantity--;
    this.isLoading = true;

    this.cartService.removeFromCart(item.id).subscribe({
      next: () => this.isLoading = false,
      error: () => {
        item.quantity++;
        this.isLoading = false;
      }
    });
  }

  deleteGift(item: CartItem) {
    this.isLoading = true;

    this.cartService
      .removeAllOfGift(item.id, item.quantity)
      .finally(() => this.isLoading = false);
  }

  checkout() {
    this.isLoading = true;
    this.cartService.checkout().subscribe({
      next: () => this.isLoading = false,
      error: () => this.isLoading = false
    });
    this.router.navigate(["/profile"])
  }
}
