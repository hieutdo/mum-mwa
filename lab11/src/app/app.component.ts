import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ComponentCounterValue = 1;

  onCounterChange(value: number) {
    this.ComponentCounterValue = value;
  }
}
