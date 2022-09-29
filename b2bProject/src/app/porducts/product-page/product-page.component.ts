import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import {ProductsService} from "../products.service";
import {product} from "../../AdminArea/adminareaproducts/adminareaproducts.component";
import { Observable, tap } from 'rxjs';
import {CartServiceService} from "../../cart/cart-service.service";
import {NgForm} from "@angular/forms";
import axios from 'axios';
import {FormBuilder, FormGroup} from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

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
import { HttpClient } from '@angular/common/http';

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
  showDesc = [true,false,false,false];
  seeEarlier: any;
  howManySeen: any;
  seeLess: any = [];
  isEmpty: boolean | any;
  slidePosition!: number;
  switchDesc = false;
  suggested:any;
  isAdmin = this.authService.getAdmin();
  hasRelated:any=false;
  onEditDesc:boolean = false;
  onEditData:boolean =false;
  altCartAnimation:boolean=false
  @ViewChild('description') desc: ElementRef | undefined;
  @ViewChild('dataSheet') dataSheet: ElementRef | undefined;
  @ViewChild('swiperRef', { static : false}) swiperRef?: SwiperComponent;
  relatedProducts:product|any = [];
   product :product|any;
   suggestedProducts:product|any;
   hasSuggested:boolean =false;
   innerWidth:any;

   mode:string ="Περιγραφής"
   desciptionForm:FormGroup|any;
   dataSheetForm:FormGroup|any;
   urlVideoForm:FormGroup|any;

   slides = [1,2,3,4];
   slidesShown?: boolean;
   loadedUser = JSON.parse(localStorage.getItem('userData') || '{}');
   username = localStorage.getItem('username');
   show!: boolean;
   thumb: any;

   smallerLine?: boolean;

   @HostListener('window:resize', ['$event'])
   onResize(event: any){
     this.innerWidth = window.innerWidth;

     if(this.innerWidth < 768 ){
       this.altCartAnimation = true;
     }
     else{
       this.altCartAnimation = false;
     }

     if(this.innerWidth <= 1200){
      this.smallerLine = true;
     }
     else{
      this.smallerLine = false;
     }

     if(this.innerWidth <=992){
      this.howManySeen = true;
     }
     else{
      this.howManySeen = false;
     }

     if(this.innerWidth <= 576){
      this.slidesShown = true;
     }
     else{
      this.slidesShown = false;
     }
   }
   onSwiper(e: Event) {

  }
  onSlideChange(swiper: SwiperComponent) {

  }

  thumbsSwiper: any;
  setThumbsSwiper(swiper: any){
    this.thumbsSwiper = swiper;
  }

  constructor(
      private fb :FormBuilder,
      private httpClient: HttpClient,
      private sanitizer:DomSanitizer,
      private authService :AuthService,
      private renderer: Renderer2,
      private el: ElementRef,
      private productsService : ProductsService,
      private cartService : CartServiceService
  ) { }

  async ngOnInit() {
    this.dataSheetForm = this.fb.group({
      datas:[null]
    })
    this.urlVideoForm = this.fb.group({
      video:[null]
    })
    this.desciptionForm = this.fb.group({
      description:[null]
    })



    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 768 ){
      this.altCartAnimation = true;
    }
    else{
      this.altCartAnimation = false;
    }

    if(this.innerWidth <= 576){
      this.slidesShown = true;
     }
     else{
      this.slidesShown = false;
     }

     if(this.innerWidth <= 1200){
      this.smallerLine = true;
     }
     else{
      this.smallerLine = false;
     }

     if(this.innerWidth <=992){
      this.howManySeen = true;
     }
     else{
      this.howManySeen = false;
     }

    this.product=this.productsService.getSingelProduct()
    console.log(this.product)
    console.log(typeof(this.product.description));


    let request = await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllproductsRelated.php",{mtrl:this.product.mtrl})
    console.log(request.data)
    this.suggestedProducts = request.data.products;
    if(this.suggestedProducts.length !=0){
      this.hasSuggested = true;
    }

    let sugg = await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllSuggested.php",
    {
      mtrl:this.product.mtrl
    })
    console.log(sugg.data.products);
    this.suggested = sugg.data.products;
    if(this.suggested.length ==0){
        this.hasRelated=false;
    }else{
      this.hasRelated = true;
    }

    this.getSeeEarlier();

  }
  editData(){
    console.log("DATA");

    this.onEditData = true
  }
  uploadDescription(){

      console.log(this.desciptionForm.value.description);
      axios.post("https://perlarest.vinoitalia.gr/php-auth-api/updateDescription.php",{
        mtrl:this.product.mtrl,
        desc:this.desciptionForm.value.description
      }).then(resData=>{
        console.log(resData.data);

        setTimeout(()=>{
          this.product.description=resData.data.description
          this.productsService.setSingleProduct(this.product);
          // window.location.reload();
        },50)
      })

  }
  updateDataSheet(){
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/updateDataSheet.php",{
      mtrl:this.product.mtrl,
      data:this.dataSheetForm.value.datas
    }).then(resData=>{
      setTimeout(()=>{
        console.log(resData.data);

        this.product.data_sheet = resData.data.data_sheet
        console.log(this.product);

        this.productsService.setSingleProduct(this.product);
        //  window.location.reload();
      },50)
    })
  }
  closeForm(){
   window.location.reload();
  }
  editDescription(){
    this.onEditDesc = true;


  }

  async getSeeEarlier(){
    let req =await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllSeeEarlier.php",{
       trdr: this.loadedUser.trdr
     })
     this.seeEarlier = req.data.products;
     if(this.seeEarlier.length == 0){
       this.isEmpty = true;
     }else{
       this.isEmpty = false;
     }

    console.log(this.seeEarlier);
    for(let i=0;i<4;i++){
      this.seeLess.push(this.seeEarlier[i]);
    }
    console.log(this.seeLess);
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


  stepper(myInput:any,btn: any){
      let id = btn.id;
      let min = myInput.getAttribute("min");
      let max = myInput.getAttribute("max");
      let step = myInput.getAttribute("step");
      let val = myInput.getAttribute("value");
      let calcStep = (id == "increment") ? (step*1) : (step * -1);
      let newValue = parseInt(val) + calcStep;

      if(newValue >= min && newValue <= max){
        myInput.setAttribute("value", newValue);
      }
  }

  ul(index: any) {
    for(let i=0;i<this.showDesc.length;i++){
      if(i=== index){
        this.showDesc[i] = true;
      }
      else{
        this.showDesc[i] = false;
      }


    }
    if(index == 0){
      this.switchDesc = false;
      this.onEditData=false;
      this.onEditDesc=false;
      this.urlOpen=false;
    }else if( index == 1){
      this.mode="Data Sheet"
      this.switchDesc = true;
      this.onEditData=false;
      this.onEditDesc=false;
      this.urlOpen=false;

    }else if(index == 3){
      this.switchDesc = false;
      this.onEditData=false;
      this.onEditDesc=false;
      this.urlOpen=true;
    }else{
      this.switchDesc = false;
      this.onEditData=false;
      this.onEditDesc=false;
      this.urlOpen=false;
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
  downloadMyFile(pdf:any){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'https://perlarest.vinoitalia.gr/php-auth-api/pdf/'+pdf);
    link.setAttribute('download',pdf );
    document.body.appendChild(link);
    link.click();
    link.remove();
}
urlOpen:boolean=false;
openURL(){
  this.urlOpen =true;
}



async uploadUrl(){



  let req = await axios.post("https://perlarest.vinoitalia.gr/php-auth-api/uploadVideo.php",{
    mtrl:this.product.mtrl,
    url:this.urlVideoForm.value.video
  })
  console.log(req.data);
  this.product.video = req.data.video
  this.productsService.setSingleProduct(this.product);
}
}
