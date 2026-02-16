import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AdminService } from '../../../core/services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './dashboard.html'
})
export class AdminDashboardComponent implements OnInit {

  totalDonors = 0;
  totalGifts = 0;
  totalTickets = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit() {

    this.adminService.getDashboard().subscribe(res => {

      this.totalDonors = res.totalDonors;
      this.totalGifts = res.totalGifts;
      this.totalTickets = res.totalTickets;

    });

  }

}
