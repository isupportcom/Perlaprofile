import { Component, ElementRef, EventEmitter, HostListener, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { product } from './AdminArea/adminareaproducts/adminareaproducts.component';
import { CartServiceService } from './cart/cart-service.service';
import { ProductsService } from './porducts/products.service';
import {AuthService} from "./services/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy,OnInit{
  title = 'b2bProject';
  age = '10';
  loggedIn: boolean = true;
  productAdded?: boolean = false;
  waiting?: boolean = false;
  TopScroll: any;
  LeftScroll: any;
  products: product[] = []
  singleProduct: any;


  constructor(
    private router:Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cartService: CartServiceService,
    private renderer: Renderer2,
    private productService: ProductsService
  ){

  }

 
  ngOnInit(){
    this.authService.autoLogin();

    this.authService.setAdmin(true);

    this.route.data.subscribe((data: Data) => {
      // console.log(data);
    })
    this.authService.loggedIn.subscribe(res => {
      this.loggedIn = res;
      
    })

    this.cartService.productAdded.subscribe(res => {
      this.waiting = true;
      this.products = this.productService.getAll();
      this.singleProduct = this.productService.getSingelProduct()
 
      

      setTimeout(()=>{
        this.productAdded = true;
        this.waiting = false;
      },1000)
      
    })

    // this.router.navigate(['log-in'])
  }


  handleClose(){
    this.productAdded = false;
    
    window.location.reload();
  }

  handleGoToCart(){
    
    this.productAdded = false;
    this.router.navigate(['cart']);
    setTimeout(() => {
      window.location.reload();
    },100)
    
    
  }



  ngOnDestroy(){
    
  }




}
