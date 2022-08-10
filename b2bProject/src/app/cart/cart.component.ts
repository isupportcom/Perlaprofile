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
  products :product[] = []

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private cartService : CartServiceService
  ) { }

  ngOnInit(): void {
    this.products = this.cartService.getItems();
    console.log(this.products[0])
  }

  handleCheckout(){
    this.router.navigate(['checkout']);
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
