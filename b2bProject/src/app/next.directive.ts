import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private elem: ElementRef) {


  }

  @HostListener('click')
  nextFunction(){
    var element = this.elem.nativeElement.parentElement.parentElement.children[1].children[0];
    var items = element.getElementsByClassName('item');


    element.append(items[0]);
    for(let item of items){
        item.classList.add('nextAnim');
    }

    setTimeout(() => {
      for(let item of items){
        item.classList.remove('nextAnim');
      }
    },700);



  }

}
