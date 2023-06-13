import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements OnChanges {
  @Input() highlight: boolean;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.highlight) {
      this.el.nativeElement.style.backgroundColor = 'yellow';
    } else {
      this.el.nativeElement.style.backgroundColor = '';
    }
  }
}