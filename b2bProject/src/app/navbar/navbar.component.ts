import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isAdminArea = false;

  @ViewChild('navToggle') navToggle!:ElementRef;
  
 

  @ViewChild('dropdown') dropdown!: ElementRef;
  isOpen = false;
  isToggelOpen = false;
  isAdmin : boolean = this.authService.getAdmin()
  @Output() logoutEvent = new EventEmitter<boolean>();
  public isCollapsed = true;
  constructor(
    private authService: AuthService,
    private router :Router) { }
   

    username = localStorage.getItem("username");

  ngOnInit(): void {
    // this.authService.usernameChanged.subscribe(
    //   (username: string) => {
    //     this.username = username;
    //   }
    // );    
    
    
    
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
    this.authService.setAuthentication(false);
    if(this.authService.getAdmin()){
      this.authService.setAdmin(false);
    }
    localStorage.setItem("userType","notLoggin")
    this.router.navigate([''])
  }
  navigateTo(destination:string){
    this.router.navigate([destination]);
  }

  handleCart(){
    this.navigateTo('cart');
  }
}

//
