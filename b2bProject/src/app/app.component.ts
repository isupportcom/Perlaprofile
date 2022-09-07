import { Component, ElementRef, EventEmitter, HostListener, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  products: product[] = [];
  singleProduct: any;
  relatedProducts:product|any = [];
  group: any;
  showScope3: boolean = false;
  itemsToCart: product|any = [];

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
    if(localStorage.getItem("username") == "Admin"){this.authService.setAdmin(true)}




    this.route.data.subscribe((data: Data) => {
      // console.log(data);
    })
    this.authService.loggedIn.subscribe(res => {
      this.loggedIn = res;

    })

    this.cartService.productAdded.subscribe(res => {
      this.products = this.productService.getAll();
      this.singleProduct = this.productService.getSingelProduct();

      let relatedProductsObs: Observable<any>;

      relatedProductsObs = this.productService.getRelatedProducts(this.singleProduct.mtrl);

      relatedProductsObs.subscribe(resData => {
        this.relatedProducts = resData.related;
        
      })
      setTimeout(() => {
        console.log(this.relatedProducts);
        
      },500);
      
      
      this.productAdded = true;

    })

    // this.router.navigate(['log-in'])
  }

  handleGrouping(product: any){
    let groupingObs: Observable<any>;

    groupingObs = this.productService.setGrouping(this.singleProduct.mtrl,product.grouping);

    groupingObs.subscribe(resData => {
      console.log(resData);
      
      this.group = resData;
      
    });
    setTimeout(() => {
      console.log(this.group);
      
      

      if(this.group.Scope2.length > 0){
        if(this.group.Scope3.length <= 0){
          this.singleProduct.show = true;
          this.cartService.addToCart(this.singleProduct);
          localStorage.setItem("products",JSON.stringify(this.cartService.getItems()));
          this.cartService.sendProductAdded(true);
          this.itemsToCart.push(this.singleProduct);
  
          product.show = true;
          this.cartService.addToCart(product);
          localStorage.setItem("products",JSON.stringify(this.cartService.getItems()));
          this.cartService.sendProductAdded(true);
          this.itemsToCart.push(product);
          for(let prod of this.group.Scope2){
            prod.show = true;
            this.cartService.addToCart(prod);
            localStorage.setItem("products",JSON.stringify(this.cartService.getItems()));
            this.cartService.sendProductAdded(true);
            this.itemsToCart.push(prod);
          }
        }
        else{
          this.itemsToCart.push(this.singleProduct);
          this.itemsToCart.push(product);
          for(let prod of this.group.Scope2){
            this.itemsToCart.push(prod);
          }
          console.log(this.itemsToCart);
          
          this.showScope3 = true;
        }
        


        this.productAdded = false;
        // window.location.reload();
      }
      else{
        if(this.group.Scope3.length <= 0){
          this.singleProduct.show = true;
          this.cartService.addToCart(this.singleProduct);
          localStorage.setItem("products",JSON.stringify(this.cartService.getItems()));
          this.cartService.sendProductAdded(true);
          this.itemsToCart.push(this.singleProduct);

          product.show = true;
          this.cartService.addToCart(product);
          localStorage.setItem("products",JSON.stringify(this.cartService.getItems()));
          this.cartService.sendProductAdded(true);
          this.itemsToCart.push(product);
        }
        else{
          this.itemsToCart.push(this.singleProduct);
          this.itemsToCart.push(product);
          console.log(this.itemsToCart);
          this.showScope3 = true;
        }

        

        this.productAdded = false;
        // window.location.reload();
      }
    },500)
  }

  addToCart(product: any){
    this.productAdded = false;
    this.itemsToCart.push(product);

    for(let prod of this.itemsToCart){
      prod.show = true;
      this.cartService.addToCart(prod);
      localStorage.setItem("products",JSON.stringify(this.cartService.getItems()));
      this.cartService.sendProductAdded(true);
    }

    this.showScope3 = false;
    window.location.reload();
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
