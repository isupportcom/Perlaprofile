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
    this.authService.sendLoggedIn(false);
    // this.authService.setAdmin(false);

      // if(localStorage.getItem('userType') == "Admin"){
      //   this.authService.setAdmin(true)
      // }




  }

  clearAll(){
    this.products = this.cartService.clearCart();
    localStorage.setItem("products",JSON.stringify(this.products));
  }

  loginProcess(f:NgForm){
    console.log(f);
    console.log(f.value);
      //  this.username = f.value.username;
      //  this.password = f.value.password;
    // console.log(f.value.username)
    // console.log(f.value.password)
    // console.log(this.username);
    // console.log(this.password);
      let authObs: Observable<AuthResponseData>;

      authObs = this.authService.login(this.username,this.password);

      authObs.subscribe((resData:any) =>{
        if(resData.success == 1){
          // console.log(resData);
          // axios.post("https://perlarest.vinoitalia.gr/php-auth-api/updateStock.php",{
          //   method:"STOCKUPDATE"
          // }).then(res=>{
          //   console.log(res.data)



          // })

          if(resData.isAdmin== "1"){
            this.router.navigate(['dashboard/insert-products']);
          }else{
            this.router.navigate(['home']);
          }
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
