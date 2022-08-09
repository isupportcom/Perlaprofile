import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
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
  isAdmin : boolean = this.authService.getAdmin()

  @Output() logoutEvent = new EventEmitter<boolean>();
  public isCollapsed = true;
  constructor(
    private authService: AuthService,
    private router :Router,
    private route: ActivatedRoute) { }


    username = localStorage.getItem("username");

  ngOnInit(): void {
    // this.authService.usernameChanged.subscribe(git
    //   (username: string) => {
    //     this.username = username;
    //   }
    // );
    this.route.queryParams.subscribe((params: any) => {
      this.isAdmin = params.data;
    });



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
  }
  navigateTo(destination:string){
    this.router.navigate([destination]);
  }

  handleCart(){
    this.navigateTo('cart');
  }
}

//
