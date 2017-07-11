import { Directive, ElementRef, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: '[upper]'
})
export class UpperDirective implements OnInit{

  constructor(private element: ElementRef, private renderer: Renderer) { }

  ngOnInit(): void {
    this.renderer.setElementStyle(this.element.nativeElement, 'text-transform', 'uppercase');
  }

}
