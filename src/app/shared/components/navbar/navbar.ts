import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart';
import { AuthService } from '../../../core/services/auth';
import { RaffleStateService } from '../../../core/services/RaffleStateService';

// PrimeNG imports
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    ButtonModule,
    BadgeModule,
    DialogModule,
    ToastModule
  ],
  templateUrl: './navbar.html',
  providers: [MessageService]
})
export class NavbarComponent {

  raffleDialogVisible = false;  // דגל להראות דיאלוג
  raffleMessage = '';

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    public raffleState: RaffleStateService,
    private messageService: MessageService
  ) {}

  startRaffle() {
    // פותח דיאלוג אישור
    this.raffleDialogVisible = true;
  }

  confirmStartRaffle() {
    // סגירת הדיאלוג
    this.raffleDialogVisible = false;

    this.raffleState.startRaffle().subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'ההגרלה התחילה', detail:'ההגרלה התחילה בהצלחה'});
      },
      error: () => {
        this.messageService.add({severity:'error', summary:'שגיאה', detail:'שגיאה בהפעלת ההגרלה'});
      }
    });
  }

  cancelStartRaffle() {
    this.raffleDialogVisible = false;
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.cartService.clearLocalCart();
    this.authService.logout();
  }
}
