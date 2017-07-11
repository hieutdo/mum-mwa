import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-comp',
  template: `
    <ul>
      <li *ngFor="let item of data" upper [myvisibility]="visibility">{{ item }}</li>
    </ul>
    <button (click)="toggleVisibility()" #toggleBtn>{{ toggleBtnText }}</button>
  `
})
export class MyCompComponent implements OnInit {
  @Input()
  data: string[];
  visibility: boolean;
  toggleBtnText: string;

  toggleVisibility() {
    this.visibility = !this.visibility;
    this.toggleBtnText = `${this.visibility ? 'Hide' : 'Show'} items`;
  }

  ngOnInit(): void {
    this.toggleVisibility();
  }
}
