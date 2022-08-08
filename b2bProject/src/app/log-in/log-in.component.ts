import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {NgForm} from "@angular/forms";
import data from "../../dummyData.json";
import axios from 'axios';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { User } from '../services/user.model';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {
  userType:string = '';
  username:string = '';
  password:string = '';
  // user : user | any;
  constructor(private router:Router,
              private authService:AuthService,
              private route: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    if(localStorage.getItem("userType") != "notLoggin" ){
      if(localStorage.getItem('userType') == "Admin"){
        this.authService.setAdmin(true)
      }
    }

    this.authService.sendLoggedIn(false);

  }

  loginProcess(f:NgForm){
    this.username = f.value.username;
    this.password = f.value.password;
    // axios.get("https://testdatabaseconection.whouse.gr/?id=3&username="+this.username+"&password="+this.password)
    // .then(resData=>{
    // console.log(resData.data);
    // this.user = {
      // name: resData.data[0].name,
      // surname: resData.data[0].surname,
      // username: resData.data[0].username,
      // password: resData.data[0].password,
      // _token: resData.data[0].token
    // }
    // this.authenticationProcces();
    // localStorage.setItem('userData',JSON.stringify(this.user));
    // })
    
    this.authService.login(this.username,this.password);
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));
    this.router.navigate(['products']);
  } 

  

  
  // authenticationProcces(){
  //   if (this.username ==this.user.username  && this.password == this.user.password){
  //     this.userType = 'admin';
  //     this.authService.setAuthentication(true);
  //     this.authService.setAdmin(true)
  //     localStorage.setItem("userType","Admin")
  //     this.router.navigate(['products'], {queryParams: {data: this.userType === 'admin' ? true : false}});
  //   }
  // }
  
  loginProcessforGuess(){
    this.authService.setAuthentication(true);
    localStorage.setItem("userType","Customer")
    this.router.navigate(['products'])
  }


  ngOnDestroy(): void {
    this.authService.sendLoggedIn(true)
    
  }
}
