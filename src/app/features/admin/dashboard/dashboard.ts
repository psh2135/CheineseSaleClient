// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CardModule } from 'primeng/card';
// import { AdminService } from '../../../core/services/admin';

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   imports: [CommonModule, CardModule],
//   templateUrl: './dashboard.html'
// })
// export class AdminDashboardComponent implements OnInit {

//   totalDonors = 0;
//   totalGifts = 0;
//   totalTickets = 0;

//   constructor(private adminService: AdminService) {}

//   ngOnInit() {

//     this.adminService.getDashboard().subscribe(res => {

//       this.totalDonors = res.totalDonors;
//       this.totalGifts = res.totalGifts;
//       this.totalTickets = res.totalTickets;

//     });

//   }

// }
import { Component, OnInit } from '@angular/core';
import {
  AdminService,
  DashboardStats,
  TopGift,
  SalesByDay
} from '../../../core/services/admin';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.html',
   imports: [
    CommonModule,
    CardModule,
    ChartModule,
    TableModule,
    ProgressSpinnerModule
  ],
})
export class AdminDashboardComponent implements OnInit {

  dashboard!: DashboardStats;
  loading = true;

  pieData: any;
  lineData: any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.adminService.getDashboard()
      .subscribe((res: DashboardStats) => {
        this.dashboard = res;
        this.buildCharts();
        this.loading = false;
      });
  }

  buildCharts() {

    this.pieData = {
      labels: this.dashboard.topGifts.map((g: TopGift) => g.name),
      datasets: [
        {
          data: this.dashboard.topGifts.map((g: TopGift) => g.ticketsCount)
        }
      ]
    };

    this.lineData = {
      labels: this.dashboard.salesByDay.map((s: SalesByDay) => s.date),
      datasets: [
        {
          label: 'Sales',
          data: this.dashboard.salesByDay.map((s: SalesByDay) => s.amount),
          fill: false,
          tension: 0.4
        }
      ]
    };
  }
}
