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
    this.products = JSON.parse(<string>localStorage.getItem("products") )
    localStorage.setItem("products",JSON.stringify(this.products))
    this.products = JSON.parse(<string>localStorage.getItem("products"));

    this.length = this.products.length;

    for(let prod of this.products){
      this.GrandTotal += +prod.wholesale;
    }
    console.log(this.GrandTotal)


  }


  removeOne(item: any, index: number){

      if(this.length > 1){
        this.GrandTotal -= this.products[index].wholesale;
      }
      else{
        this.GrandTotal = 0;
      }
      this.products =this.cartService.removeItem(index);

      localStorage.setItem("products",JSON.stringify(this.products));
      this.products = JSON.parse(<string>localStorage.getItem("products") ) ;
      console.log(this.products)
      this.length = this.products.length;


  }



  clearAll(){
    this.products = [];
    localStorage.setItem("products",JSON.stringify(this.products));
    this.GrandTotal = 0 ;
    this.length = 0;

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
