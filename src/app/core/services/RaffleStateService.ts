import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaffleStateService {

  private apiUrl = `${environment.apiUrl}/Lottery/status`;

  private isLockedSubject = new BehaviorSubject<boolean>(false);
  isLocked$ = this.isLockedSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadState(): void {
    this.http.get<{ isLocked: boolean }>(this.apiUrl)
      .subscribe(res => {
        this.isLockedSubject.next(res.isLocked);
      });
  }

  get isLocked(): boolean {
    return this.isLockedSubject.value;
  }
  startRaffle() {
    return this.http.post(`${environment.apiUrl}/Lottery/start`, {})
      .pipe(
        tap(() => {
          this.isLockedSubject.next(true);
        })
      );
  }

}
