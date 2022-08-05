import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "./services/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'b2bProject';
  age = '10';
  loggedIn: boolean = true;
  constructor(
    private router:Router,
    private authService: AuthService
              ){

  }
  ngOnInit(){
    if(localStorage.getItem("userType") == "Admin"){
      this.authService.setAdmin(true);
    }

    // this.router.navigate(['log-in'])
  }

  isAdmin = false;
  handleGetAdmin(){
   this.isAdmin = true;
   console.log("Hello");

  }

  logoutHandle(){
    localStorage.removeItem("username");
    this.loggedIn = false;
  }


}
