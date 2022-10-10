import { Component, HostListener, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-the-company',
  templateUrl: './the-company.component.html',
  styleUrls: ['./the-company.component.css']
})
export class TheCompanyComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }

  images = ['../../assets/1.jpg','../../assets/2.jpg','../../assets/3.jpg','../../assets/4.jpg','../../assets/5.jpg','../../assets/6.jpg','../../assets/7.jpg','../../assets/8.jpg'];
  
  showDesc = [true,false];
  smallerLine?: boolean;

  innerWidth: any;
  @HostListener('window:resize', ['$event'])
   onResize(event: any){
     this.innerWidth = window.innerWidth;
     if(this.innerWidth <= 1200){
      this.smallerLine = true;
     }
     else{
      this.smallerLine = false;
     }


     var underlines: any = document.querySelectorAll(".underline");

     let goLeft;
 
     if(this.smallerLine){
       goLeft = 165;
     }
     else{
       goLeft = 100;
     }

     if(this.showDesc[0]){
      for (let i = 0; i < underlines.length; i++) {
        underlines[i].setAttribute('style', 'transform: translate3d(' + 1 * goLeft + '%,0,0);');
      }  
     }
     else{
      for (let i = 0; i < underlines.length; i++) {
        underlines[i].setAttribute('style', 'transform: translate3d(' + 2 * goLeft + '%,0,0);');
      }
     }

    
     
    }

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 1200){
      this.smallerLine = true;
     }
     else{
      this.smallerLine = false;
     }


     var underlines: any = document.querySelectorAll(".underline");

     let goLeft;
 
     if(this.smallerLine){
       goLeft = 165;
     }
     else{
       goLeft = 100;
     }
 
     for (var i = 0; i < underlines.length; i++) {
       underlines[i].setAttribute('style', 'transform: translate3d(' + 1 * goLeft + '%,0,0);');
 
     }
  }

  ul(index: any) {
    for(let i=0;i<this.showDesc.length;i++){
      if(i=== index-1){
        this.showDesc[i] = true;
      }
      else{
        this.showDesc[i] = false;
      }
    }


    var underlines: any = document.querySelectorAll(".underline");

    let goLeft;

    if(this.smallerLine){
      goLeft = 165;
    }
    else{
      goLeft = 100;
    }

    for (var i = 0; i < underlines.length; i++) {
      underlines[i].setAttribute('style', 'transform: translate3d(' + index * goLeft + '%,0,0);');

    }
  }

}
