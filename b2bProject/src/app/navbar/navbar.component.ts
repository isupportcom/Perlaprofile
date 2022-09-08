import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { product } from '../AdminArea/adminareaproducts/adminareaproducts.component';
import { CartServiceService } from '../cart/cart-service.service';
import { ProductsService } from '../porducts/products.service';
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isAdminArea = false;
  products :product |any = [];
  temp: product | any = [];

  // @Input() isAdmin: any;
  @ViewChild('navToggle') navToggle!:ElementRef;



  @ViewChild('dropdown') dropdown!: ElementRef;
  isOpen = false;
  isToggelOpen = false;
  isAdmin = this.authService.getAdmin();
  productAdded?: boolean;


  @Output() logoutEvent = new EventEmitter<boolean>();
  public isCollapsed = true;
  productCount: number|any;
  showProductCount: boolean = false;
  mainCategories : any = [];

  constructor(
    private authService: AuthService,
    private router :Router,
    private route: ActivatedRoute,
    private cartService: CartServiceService,
    private productsService: ProductsService) { }


  username = localStorage.getItem("username");

  ngOnInit(): void {
    this.productsService.getMainCategories().subscribe(resData => {
      this.mainCategories = resData;
      console.log(this.mainCategories);

    });

    let fetchProductsObs: Observable<any>;

    fetchProductsObs = this.cartService.getItems()

    fetchProductsObs.subscribe(resData => {
      this.temp = resData.products;
      // console.log(this.temp.length);
      
      
    })
    setTimeout(() => {
      // this.products = this.temp;
      console.log(this.temp.length);
      
    },50)
    
    
    
    this.cartService.productAdded.subscribe(res => {
      this.productAdded = res;
      console.log(this.productAdded);
    })

    // this.cartService.sendProductCount(0);

    // this.cartService.productCount.subscribe(res => {
    //   localStorage.setItem('productCount', <string>(<unknown>res));
    //   console.log(<number>(<unknown>(localStorage.getItem('productCount'))));

    //   this.productCount = <number>(<unknown>(localStorage.getItem('productCount')));
    // })
  }

  goToProducts(mainCategory: any){
    console.log(mainCategory);
    this.router.navigate(['products', mainCategory.id,mainCategory.name]);
    setTimeout(() => {
      window.location.reload();
    },50)
  }

  handleLeaveAdminArea(){
    this.isAdminArea = false;
    console.log(this.isAdminArea);
    this.router.navigate(["products"]);
  }

  handleDashboard(){
    this.isAdminArea = true;
    console.log(this.isAdminArea);

    this.router.navigate(["dashboard"]);
  }

  handleMyOrders(){
    this.router.navigate(["my-orders"]);
  }

  handleProfile(){
    this.router.navigate(["profile"]);
  }

  setToggle(){
    this.isToggelOpen = !this.isToggelOpen;
    if(this.isToggelOpen){
      this.navToggle.nativeElement.classList.add('show');
    }else{
      this.navToggle.nativeElement.classList.remove('show')
    }


  }


  setDropdown(element: HTMLElement){
    this.isOpen = !this.isOpen;
    if(this.isOpen){
      element.classList.add('show');
    }else{
      element.classList.remove('show');
    }



  }

  handleHomepage(){
    this.router.navigate(['home'])
  }



  logout(){



    console.log(this.authService.user.getValue()?.token);
    this.authService.logout();
    console.log(this.authService.user.getValue());

    localStorage.setItem("userType","notLoggin")
    this.router.navigate(['log-in'])
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));


  }
  navigateTo(destination:string){
    this.router.navigate([destination]);
  }

  handleCart(){
    this.navigateTo('cart');
  }
}

//
