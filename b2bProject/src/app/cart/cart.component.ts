import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";
import {CartServiceService} from "./cart-service.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('text') text: ElementRef | undefined;
  products :product[] |any
  GrandTotal:number=0;
  wholesale:number=0;
  length:number|any
  show: boolean = true;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private cartService : CartServiceService
  ) { }

  ngOnInit(): void {

    console.log(JSON.parse(localStorage.getItem("products") || '{}'))
    //  = JSON.parse(localStorage.getItem("products") || '{}')
    this.products = JSON.parse(localStorage.getItem("products") || '{}')
    localStorage.setItem("products",JSON.stringify(this.products))
    this.products = JSON.parse(localStorage.getItem("products") || '{}');

    this.length = this.products.length;

    for(let prod of this.products){
      this.GrandTotal += +prod.wholesale;
    }
    console.log(this.GrandTotal)
    // this.products = JSON.parse(localStorage.getItem("products") || '{}')

  }


  removeOne(item: any, index: number){
    // this.products[index].show = false
    // this.length -=1
    // localStorage.setItem("len",this.length);
      this.GrandTotal -= this.products[index].wholesale
      this.cartService.removeItem(index);
      this.products = this.cartService.getItems();
      localStorage.setItem("products",JSON.stringify(this.products));
      this.products = JSON.parse(localStorage.getItem("products") || '{}') ;
      this.length = this.products.length;

    // this.length -=1;
    // this.GrandTotal-= this.products[index].wholesale
    // this.products[index] = this.cartService.removeItem(index);
    // localStorage.setItem("products",JSON.stringify(this.products));
    // this.products = localStorage.getItem("products")
    // localStorage.setItem("len",this.products.length);
    // this.length-=1;
    // this.GrandTotal-= this.products[index].wholesale
    // this.products = this.cartService.removeItem(index)
    // console.log(this.products);
    // localStorage.setItem("len",this.length);
    // localStorage.setItem("products", JSON.stringify(this.products));
  }



  clearAll(){
    this.products = [];
    localStorage.setItem("products",JSON.stringify(this.products));
    this.GrandTotal = 0 ;
    this.length = 0;
  }

  handleMouseOver(){
    this.renderer.setStyle(this.text?.nativeElement, 'font-weight', 'normal');
  }

  handleMouseLeave(){
    this.renderer.setStyle(this.text?.nativeElement, 'font-weight', 'lighter');
  }

  handleClick(){
    this.router.navigate(['products']);
  }

}
