import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor(private elem: ElementRef) { }

  @HostListener('click')
  prevFunction(){
    var element = this.elem.nativeElement.parentElement.parentElement.children[1].children[0];
    var items = element.getElementsByClassName('item');
    element.prepend(items[items.length - 1]);



  }
}
