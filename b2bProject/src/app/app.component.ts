import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
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
    private authService: AuthService,
    private route: ActivatedRoute
              ){

  }
  ngOnInit(){
    this.authService.autoLogin();
    
    if(localStorage.getItem("userType") == "Admin"){
      this.authService.setAdmin(true);
    }
    this.route.data.subscribe((data: Data) => {
      console.log(data);  
    })
    this.authService.loggedIn.subscribe(res => {
      console.log(res);
      this.loggedIn = res;
      
    })
    
    // this.router.navigate(['log-in'])
  }


 


}
