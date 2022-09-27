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


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
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
  relatedProducts:product|any = [];
   product :product|any;
   suggestedProducts:product|any;
   hasSuggested:boolean =false;
   innerWidth:any;
   mode:string ="Περιγραφής"
   desciptionForm:FormGroup|any;
   dataSheetForm:FormGroup|any;
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
      private fb :FormBuilder,
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

    this.slidePosition = 1;
    this.SlideShow(this.slidePosition);
    console.log();

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
         window.location.reload();
      },50)
    })
  }
  closeForm(){
   window.location.reload();
  }
  editDescription(){
    this.onEditDesc = true;
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
      this.mode="Περιγραφης"
      this.switchDesc = false;
      this.onEditData=false;
      this.onEditDesc=false;
    }
  }
  showDescription2(){
    if(!this.switchDesc){
      this.mode="Data Sheet"
      this.switchDesc = true;
      this.onEditData=false;
      this.onEditDesc=false;
    }
  }
}


