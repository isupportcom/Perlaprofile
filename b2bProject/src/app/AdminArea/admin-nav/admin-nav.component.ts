import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  @ViewChild('dropdown') dropdown!: ElementRef;
  isOpen = false;
  component:number | any;
  constructor(
      private authService: AuthService,
      private router:Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("page")) {
      this.component = localStorage.getItem("page");
    }
  }

  setDropdown(element: HTMLElement) {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      element.classList.add('show');
    } else {
      element.classList.remove('show');
    }
  }


  logout(){

  }

  handleHomepage(){
    this.router.navigate(['products']);
    setTimeout(() => {
      window.location.reload();
    },50)
    
  }

  navigateTo(destination:string){
      this.router.navigate([destination])

  }
  showContent(component:number){
    this.component = component;
    localStorage.setItem("page",JSON.stringify(this.component))
  }




}
