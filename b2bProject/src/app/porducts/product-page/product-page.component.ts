import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {ProductsService} from "../products.service";
import {product} from "../../AdminArea/adminareaproducts/adminareaproducts.component";

import {CartServiceService} from "../../cart/cart-service.service";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  slidePosition!: number;
  switchDesc = false;
  @ViewChild('description') desc: ElementRef | undefined;
  @ViewChild('dataSheet') dataSheet: ElementRef | undefined;
   product :product|any;
  constructor(
      private renderer: Renderer2,
      private el: ElementRef,
      private productsService : ProductsService,
      private cartService : CartServiceService
  ) { }

  ngOnInit(): void {
    this.slidePosition = 1;
    this.SlideShow(this.slidePosition);

    this.product=JSON.parse(localStorage.getItem("single") || '{}');
    console.log(this.product)




  }
  addToCart(){
      this.product.show = true;

     this.cartService.addToCart(this.product);
      localStorage.setItem("products",JSON.stringify(this.cartService.getItems()));
      this.cartService.sendProductAdded(true);

  }


  plusSlides(n: number){
    this.SlideShow(this.slidePosition += n);
  }

  currentSlide(n: number){
    this.SlideShow(this.slidePosition = n);
  }

  SlideShow(n: number){
    console.log(n);

    var i;
    var slides = this.el.nativeElement.querySelectorAll('.Containers');
    console.log(slides);

    var circles = this.el.nativeElement.querySelectorAll('.dots');

    if(n > slides.length){
      this.slidePosition = 1;
    }
    if(n < 1){
      this.slidePosition = slides.length;
    }
    for(let slide of slides){
      slide.style.display = "none";
    }

    for(let circle of circles){
      circle.className = circle.className.replace(" enalbe", "");
      // circles[i].className = circles[i].className.replace(" enable", "");
    }
    slides[this.slidePosition-1].style.display = "block";
    circles[this.slidePosition-1].className += " enable"
  }

  showDescription1(){
    if(this.switchDesc){
      this.switchDesc = false;
    }
  }
  showDescription2(){
    if(!this.switchDesc){
      this.switchDesc = true;
    }
  }
}


