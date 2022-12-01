import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {NgForm} from "@angular/forms";
import data from "../../dummyData.json";
import axios from 'axios';
import { Observable } from 'rxjs';
import { CartServiceService } from '../cart/cart-service.service';
import { TranslateConfigService } from '../services/translate-config.service';
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
  error: boolean = false;
  mphke: boolean = false;
  message: string = '';
  userType:string = '';
  username:string = '';
  password:string = '';
  user : user | any;
  upokatastimata: any = [];
  selectedId: any;
  private tokenExpirationTimer: any;
  products: any;
  @ViewChild('branch') branch: any;
  constructor(private router:Router,
              private authService:AuthService,
              private route: ActivatedRoute,
              private translateService: TranslateConfigService,
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

  loginProcess(f:NgForm,btn?:any){
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => {
        console.log(f);
        console.log(f.value);
        console.log("SDFGSDFGSDFG");

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
              console.log(resData);
              axios.post("https://perlarest.vinoitalia.gr/php-auth-api/updateStock.php",{
                method:"STOCKUPDATE"
              }).then(res=>{
                console.log(res.data)



              })
              this.error = false;
              if(resData.isAdmin== "1"){
                this.router.navigate(['dashboard/insert-products']);
              }else{
                axios.post('https://perlaNodeRest.vinoitalia.gr/user/getYpokatastimata',{
                  trdr: resData.trdr
                }).then(resData => {
                  console.log(resData.data.ypokat);
                  if(resData.data.ypokat.length){
                  this.upokatastimata = resData.data.ypokat;
                  this.mphke = true;
                  }else {
                    this.router.navigate(['home']);
                  }
                })

              }
            }
            else{
              this.message = resData.message
              this.error = true;
              localStorage.clear();
            }

          })
        btn.classList.remove('loading');
      },1500)
    }


  }

  handleUpokat(e: any){
    console.log(e.target.value);
    this.selectedId = +e.target.value
  }

  saveUpokat(){
    if(this.selectedId){
      for(let upokat of this.upokatastimata){
        if(upokat.trdrbranch == this.selectedId){
          console.log(upokat);
          upokat = JSON.stringify(upokat);
          localStorage.setItem('upokatastima', upokat);
        }
      }
    }
    else{
      console.log(this.branch.nativeElement.value);
      if(this.upokatastimata.length != 0 ){
      for(let upokat of this.upokatastimata){
        if(upokat.trdrbranch == this.branch.nativeElement.value){
          console.log(upokat);
          upokat = JSON.stringify(upokat);
          localStorage.setItem('upokatastima', upokat);
        }
      }
    }
  }
    setTimeout(() => {
      this.router.navigate(['home']);
    },150);
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
