import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { CartServiceService } from '../cart/cart-service.service';
import { Category } from './categories.model';
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-porducts',
  templateUrl: './porducts.component.html',
  styleUrls: ['./porducts.component.css']
})



export class PorductsComponent implements OnInit {
  
  constructor(private cartService: CartServiceService) { }

  innerWidth!: number;
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth;

  }

  ngOnInit(): void {

  }


}
