import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";
import {CartServiceService} from "./cart-service.service";

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
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private cartService : CartServiceService
  ) { }

  ngOnInit(): void {
    this.fillProd()

  }
  fillProd(){
    console.log(JSON.parse(localStorage.getItem("products") || '{}'))
    this.products = JSON.parse(localStorage.getItem("products") || '{}')

    for(let prod of this.products){
      this.GrandTotal += +prod.wholesale;
    }
    console.log(this.GrandTotal)

  }


  clearAll(){
    this.products =this.cartService.clearCart();
    localStorage.setItem("products",JSON.stringify(this.products));
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
