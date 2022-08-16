import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CartServiceService } from '../cart/cart-service.service';
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isAdminArea = false;
  // @Input() isAdmin: any;
  @ViewChild('navToggle') navToggle!:ElementRef;



  @ViewChild('dropdown') dropdown!: ElementRef;
  isOpen = false;
  isToggelOpen = false;
  isAdmin = true;
  productAdded?: boolean;


  @Output() logoutEvent = new EventEmitter<boolean>();
  public isCollapsed = true;
  productCount: number = <number>(<unknown>(localStorage.getItem('productCount')));
  showProductCount: boolean = false;
  
  constructor(
    private authService: AuthService,
    private router :Router,
    private route: ActivatedRoute,
    private cartService: CartServiceService) { }


    username = localStorage.getItem("username");

  ngOnInit(): void {
    this.cartService.productAdded.subscribe(res => {
      this.productAdded = res;
      console.log(this.productAdded); 
    })

    this.cartService.sendProductCount(0);

    this.cartService.productCount.subscribe(res => {
      localStorage.setItem('productCount', <string>(<unknown>res));
      console.log(<number>(<unknown>(localStorage.getItem('productCount'))));
      
      this.productCount = <number>(<unknown>(localStorage.getItem('productCount')));
    })
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
