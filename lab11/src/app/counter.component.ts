import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="increase(-1)">-</button>
    <span class="counter-value">{{ counterValue }}</span>
    <button (click)="increase(1)">+</button>
  `,
  styles: [`
    button {
      font-size: 15px;
      font-weight: bold;
      height: 30px;
      width: 30px;
    }

    .counter-value {
      display: inline-block;
      text-align: center;
      width: 40px;
    }
  `]
})
export class CounterComponent {
  counterValue: number = 0;

  increase(change) {
    this.counterValue += change;
  }
}
