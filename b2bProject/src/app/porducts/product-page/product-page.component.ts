import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import {ProductsService} from "../products.service";
import {product} from "../../AdminArea/adminareaproducts/adminareaproducts.component";
import { Observable, tap } from 'rxjs';
import {CartServiceService} from "../../cart/cart-service.service";
import {NgForm} from "@angular/forms";
import axios from 'axios';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  slidePosition!: number;
  switchDesc = false;
  altCartAnimation:boolean=false
  @ViewChild('description') desc: ElementRef | undefined;
  @ViewChild('dataSheet') dataSheet: ElementRef | undefined;
  relatedProducts:product|any = [];
   product :product|any;
   suggestedProducts:product|any;
   hasSuggested:boolean =false;
   innerWidth:any;
   @HostListener('window:resize', ['$event'])
   onResize(event: any){
     this.innerWidth = window.innerWidth;

     if(this.innerWidth < 768 ){
       this.altCartAnimation = true;
     }
     else{
       this.altCartAnimation = false;
     }
   }
  constructor(
      private renderer: Renderer2,
      private el: ElementRef,
      private productsService : ProductsService,
      private cartService : CartServiceService
  ) { }

  async ngOnInit() {


    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 768 ){
      this.altCartAnimation = true;
    }
    else{
      this.altCartAnimation = false;
    }

    this.slidePosition = 1;
    this.SlideShow(this.slidePosition);
    console.log();

    this.product=this.productsService.getSingelProduct()
    console.log(this.product)

    let request = await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllproductsRelated.php",{mtrl:this.product.mtrl})
    console.log(request.data)
    this.suggestedProducts = request.data.products;
    if(this.suggestedProducts.length !=0){
      this.hasSuggested = true;
    }





  }
  addToCart(){
      this.product.show = true;

    let relatedProductsObs: Observable<any>;

    relatedProductsObs = this.productsService.getRelatedProducts(this.product.mtrl);

    relatedProductsObs.subscribe(resData => {
      this.relatedProducts = resData.related;

    })
    setTimeout(() => {

      if(this.relatedProducts.length <= 0){
        console.log("HEllo");
        if(!this.altCartAnimation){
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }

        this.cartService.setId(this.product.mtrl)

        this.productsService.setSingleProduct(this.product);
        this.product.show = true;
        this.cartService.addToCart(this.product);

        this.cartService.sendProductAdded(true);
      }
      else{
        this.productsService.setSingleProduct(this.product);
        this.cartService.sendProductAdded(true);
      }
    },500);




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


