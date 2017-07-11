import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[myvisibility]'
})
export class MyvisibilityDirective {
  @HostBinding('class.hidden')
  hostElementHidden: boolean;

  @Input()
  set myvisibility(value: boolean) {
    this.hostElementHidden = !value;
  }
}
