import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {NgForm} from "@angular/forms";
import data from "../../dummyData.json";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  @Output() getAdmin = new EventEmitter();
  userType:string = '';
  username:string = '';
  password:string = '';

  constructor(private router:Router,
              private authService:AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userType") != "notLoggin" ){
      if(localStorage.getItem('userType') == "Admin"){
        this.authService.setAdmin(true)
      }

    }
  }

  loginProcess(f:NgForm){
      this.getAdmin.emit();
      this.username = f.value.username;
      this.password = f.value.password;
      if (this.username == data.users[0].name && this.password == data.users[0].password){
        this.userType = 'admin';
        this.authService.setAuthentication(true);
        this.authService.setAdmin(true)
        localStorage.setItem("userType","Admin")
        this.authService.setUsername(this.username);
        this.router.navigate(['products']);
      }

  }
  loginProcessforGuess(){
    this.authService.setAuthentication(true);
    localStorage.setItem("userType","Customer")
    this.router.navigate(['products'])
  }

}
