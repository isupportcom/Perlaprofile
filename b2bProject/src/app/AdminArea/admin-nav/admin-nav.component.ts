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
  constructor(
      private authService: AuthService,
      private router:Router
  ) { }

  ngOnInit(): void {
  }
  setDropdown(){
    this.isOpen = !this.isOpen;
    if(this.isOpen){
      this.dropdown.nativeElement.classList.add('show');
    }else{
      this.dropdown.nativeElement.classList.remove('show');
    }
  }
  logout(){

  }

  navigateTo(destination:string){
      this.router.navigate([destination])

  }

}
