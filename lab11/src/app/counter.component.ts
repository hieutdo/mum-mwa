import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="increase(-1)">-</button>
    <span class="counter-value">{{ counterValue }}</span>
    <button (click)="increase(1)">+</button>
    <div class="content">
      <ng-content select=".counter-value-tracker"></ng-content>
    </div>
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

    .content {
      margin-top: 10px;
    }
  `]
})
export class CounterComponent {
  counterValue = 0;

  @Output()
  counterChange = new EventEmitter<number>();

  get counter() {
    return this.counterValue;
  }

  @Input()
  set counter(value: number) {
    this.counterValue = value;
  }

  increase(change) {
    this.counterValue += change;
    this.counterChange.emit(this.counterValue);
  }
}
