import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import {ProductsService} from "../products.service";
import {product} from "../../AdminArea/adminareaproducts/adminareaproducts.component";
import { Observable, tap } from 'rxjs';
import {CartServiceService} from "../../cart/cart-service.service";
import {NgForm} from "@angular/forms";
import axios from 'axios';

import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
}  from 'swiper';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
])

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
  @ViewChild('swiperRef', { static : false}) swiperRef?: SwiperComponent;
  relatedProducts:product|any = [];
   product :product|any;
   suggestedProducts:product|any;
   hasSuggested:boolean =false;
   innerWidth:any;
   slides = [1,2,3,4];
   show!: boolean;
   thumb: any;
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
   onSwiper(e: Event) {
    console.log(e);
  }
  onSlideChange(swiper: SwiperComponent) {
    console.log(swiper);
  }

  thumbsSwiper: any;
  setThumbsSwiper(swiper: any){
    this.thumbsSwiper = swiper;
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


