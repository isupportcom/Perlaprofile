import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {NgForm} from "@angular/forms";
import data from "../../dummyData.json";
import axios from 'axios';
import { Observable } from 'rxjs';
import { CartServiceService } from '../cart/cart-service.service';
export interface user{
  name:string,
  surname:string,
  username:string,
  password:string
}

export interface AuthResponseData{
  kind: string;

  token: string;
  idToken: string;
  username: string;



  refreshToken: string;
  expiresIn: string;
  localId: string;
  success: number;
  registered?: boolean;
}
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {
  userType:string = '';
  username:string = '';
  password:string = '';
  user : user | any;
  private tokenExpirationTimer: any;
  products: any;
  constructor(private router:Router,
              private authService:AuthService,
              private route: ActivatedRoute,
              private cartService: CartServiceService) { }

  ngOnInit(): void {
    this.clearAll();
    if(localStorage.getItem("userType") != "notLoggin" ){
      // if(localStorage.getItem('userType') == "Admin"){
      //   this.authService.setAdmin(true)
      // }
    }

    this.authService.sendLoggedIn(false);

  }

  clearAll(){
    this.products = this.cartService.clearCart();
    localStorage.setItem("products",JSON.stringify(this.products));
  }

  loginProcess(f:NgForm){

      this.username = f.value.username;
      this.password = f.value.password;

      let authObs: Observable<AuthResponseData>;

      authObs = this.authService.login(this.username,this.password);

      authObs.subscribe(resData =>{
        if(resData.success == 1){
          console.log(resData);
          axios.post("https://perlarest.vinoitalia.gr/php-auth-api/updateStock.php",{
            method:"STOCKUPDATE"
          }).then(resData=>{
            console.log(resData.data)
            this.router.navigate(['home']);
          })

        }

      })

  }


  authenticationProcces(name: string, surname: string, username: string, expiresIn: number ){
    if (this.username ==this.user.username  && this.password == this.user.password){
      this.userType = 'admin';
      this.authService.setAuthentication(true);
      this.authService.setAdmin(true)
      localStorage.setItem("userType","Admin")
      this.router.navigate(['products'], {queryParams: {data: this.userType === 'admin' ? true : false}});
    }
  }
  loginProcessforGuess(){
    this.authService.setAuthentication(true);
    localStorage.setItem("userType","Customer")
    this.router.navigate(['products'])
  }


  ngOnDestroy(): void {
    this.authService.sendLoggedIn(true)

  }
}
