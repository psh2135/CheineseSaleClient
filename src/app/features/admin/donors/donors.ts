import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AdminService } from '../../../core/services/admin';

@Component({
selector: 'app-admin-donors',
standalone: true,
imports: [CommonModule, TableModule],
templateUrl: './donors.html'
})
export class AdminDonorsComponent implements OnInit {

donors:any[] = [];

constructor(private adminService: AdminService){}

ngOnInit(){

this.adminService.getDonors()
.subscribe(res => this.donors = res);

}

}
