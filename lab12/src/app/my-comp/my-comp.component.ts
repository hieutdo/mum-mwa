import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-comp',
  template: `
    <ul [style.color]="selectedColor">
      <li *ngFor="let item of data" upper [myvisibility]="visibility">{{ item }}</li>
    </ul>
    <p>Colors: {{ colors }}</p>
    <p>Selected color: <span [style.color]="selectedColor">{{ selectedColor }}</span></p>
    <p>
      <button (click)="toggleVisibility()" #toggleBtn>{{ toggleBtnText }}</button>
      <button [mycolor]="colors" (colorChange)="handleColorChange($event)">Change color</button>
    </p>
  `
})
export class MyCompComponent implements OnInit {
  @Input()
  data: string[];
  visibility: boolean;
  toggleBtnText: string;
  colors: string[];
  selectedColor: string;

  constructor() {
    this.colors = ['black', 'blue', 'green', 'red'];
    this.selectedColor = this.colors[0];
  }

  toggleVisibility() {
    this.visibility = !this.visibility;
    this.toggleBtnText = `${this.visibility ? 'Hide' : 'Show'} items`;
  }

  handleColorChange(color) {
    this.selectedColor = color;
  }

  ngOnInit(): void {
    this.toggleVisibility();
  }
}
