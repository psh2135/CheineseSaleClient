import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { AdminService } from '../../../core/services/admin';
import { Winner } from '../../../core/models/user.model';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ProgressSpinnerModule,
    ButtonModule
  ],
  templateUrl: './winners.html',
})
export class WinnersComponent implements OnInit {
  winners: Winner[] = [];
  isLoading = true;
  hasError = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadWinners();
  }

  loadWinners(): void {
    this.isLoading = true;
    this.hasError = false;

    this.adminService.getWinners().subscribe({
      next: (data) => {
        this.winners = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('שגיאה בטעינת זוכים:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}