import { Component, ElementRef, EventEmitter, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { CartServiceService } from './cart/cart-service.service';
import {AuthService} from "./services/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'b2bProject';
  age = '10';
  loggedIn: boolean = true;
  productAdded?: boolean;

  constructor(
    private router:Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cartService: CartServiceService
  ){

  }

 
  ngOnInit(){
    this.cartService.productAdded.subscribe(res => {
      
      this.productAdded = res;
      console.log(this.productAdded);
      setTimeout(() => {
        this.productAdded = false;
        console.log(this.productAdded);
      },1000);
      
      
    })
    this.authService.autoLogin();

    this.authService.setAdmin(true);

    this.route.data.subscribe((data: Data) => {
      // console.log(data);
    })
    this.authService.loggedIn.subscribe(res => {
      this.loggedIn = res;

    })

    // this.router.navigate(['log-in'])
  }





}
