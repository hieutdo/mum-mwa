import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[mycolor]'
})
export class MycolorDirective {
  @Input()
  mycolor: string[] = [];

  @Output()
  colorChange = new EventEmitter<string>();

  colorIndex = 0;

  @HostListener('click')
  handleHostClickEvent() {
    if (!this.mycolor || !this.mycolor.length) {
      return;
    }

    this.colorIndex++;

    if (this.colorIndex === this.mycolor.length) {
      this.colorIndex = 0;
    }

    this.colorChange.emit(this.mycolor[this.colorIndex]);
  }
}
