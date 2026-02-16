import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminService {

  url = 'https://localhost:7027/api';

  constructor(private http: HttpClient) { }

  getDashboard() {

    return this.http.get<any>(`${this.url}/cart/dashboard-stats`);

  }

  getDonors() {

    return this.http.get<any[]>(`${this.url}/Auth/donors`);

  }

  getGifts() {

    return this.http.get<any[]>(`${this.url}/gifts`);

  }

  getGift(id: number) {

    return this.http.get<any>(`${this.url}/gift/${id}`);

  }

  updateGift(gift: any) {

    return this.http.put(`${this.url}/gift`, gift);

  }

  runLottery(id: number) {

    return this.http.post(`${this.url}/lottery/run`, {id});

  }

}
