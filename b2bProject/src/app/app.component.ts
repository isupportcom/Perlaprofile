import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { product } from './AdminArea/adminareaproducts/adminareaproducts.component';
import { CartServiceService } from './cart/cart-service.service';
import { ProductsService } from './porducts/products.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy, OnInit {
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
  date = new Date();
  mainProdSelected: boolean = false;
  
  scope1: any= [];
  scope2: any = [];
  scope3: any = [];
  productsToCart: any = [];
  firstStep: boolean = true;
  done: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cartService: CartServiceService,
    private renderer: Renderer2,
    private productService: ProductsService
  ) {}


  ngOnInit() {


    this.authService.autoLogin();
    if (localStorage.getItem('username') == 'Admin') {
      this.authService.setAdmin(true);
    }

    this.route.data.subscribe((data: Data) => {
      console.log(data);
    });
    this.authService.loggedIn.subscribe((res) => {

      this.loggedIn = res;
    });


    

    this.cartService.productAdded.subscribe(res => {
      this.products = this.productService.getAll();
      this.singleProduct = this.productService.getSingelProduct();

      let relatedProductsObs: Observable<any>;

      relatedProductsObs = this.productService.getRelatedProducts(this.singleProduct.mtrl);

      relatedProductsObs.subscribe(resData => {
        console.log(resData);
        
        this.relatedProducts = resData.related;
      })
      setTimeout(() => {
        this.waiting = true;
        for(let product of this.relatedProducts){
          this.scope1.push(product)
          
          let groupingObs: Observable<any>;

          groupingObs = this.productService.setGrouping(this.singleProduct.mtrl,product.grouping);
      
          groupingObs.subscribe(resData => {
            
            
            
            this.group = resData;
            this.scope2.push(this.group.Scope2[0]);

          });

        }
        setTimeout(() => {
          for(let prod of this.group.Scope3){
            this.scope3.push(prod);
          }
          setTimeout(() => {
            console.log("Main Product");
            console.log(this.singleProduct);

            console.log("Scope 1");
            console.log(this.scope1);

            console.log("Scope 2");
            console.log(this.scope2);

            console.log("Scope 3");
            console.log(this.scope3);
            
            this.waiting = false;
            
          },1000)
        },100)

        
        
      },500);
      

      
      
      this.productAdded = true;

    })
  }

  handleAllSelected(product:any){
    console.log(product);
    
    for(let prod of this.group.Scope3){
      if(prod.mtrl == product){
        this.scope3 = prod
      }
    }
    console.log(this.scope3);
    this.productsToCart.push(this.scope3)

    console.log(this.productsToCart);
    
    for(let prod of this.productsToCart){
      // this.addToCart(prod);
    }

  }

  handleGrouping(scope1: any, scope2: any){
    this.productsToCart.push(this.singleProduct);
    this.productsToCart.push(scope1);
    this.productsToCart.push(scope2);
    
    
    this.firstStep = false
    
  }

  handleSecondGrouping(scope3: any){
    this.productsToCart.push(scope3)
    console.log(this.productsToCart);
    this.waiting = true;
    this.addToCart();
    setTimeout(() => {
      this.waiting = false;
      this.productAdded = false;
    },500);
  }

  addToCart(){
    
    
    this.cartService.setItemsToCartArray(this.productsToCart);
    
    let id = '';
    
    for(let prod of this.productsToCart){
      id = id + prod.mtrl;
    }

    this.cartService.setId(id);
    
    for(let prod of this.productsToCart){
      id = id + prod.mtrl;
      prod.show = true;
      this.cartService.addToCart(prod);
    }
    

  
    
  }

  handleClose(){
    this.productAdded = false;

    window.location.reload();
  }

  handleGoToCart() {
    this.productAdded = false;
    this.router.navigate(['cart']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  ngOnDestroy() {}
}
