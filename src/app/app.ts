import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { RaffleStateService } from './core/services/RaffleStateService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor(private raffleState: RaffleStateService) { }

  ngOnInit() {
    this.raffleState.loadState();
  }
  protected readonly title = signal('chinese-sale-client');
}
