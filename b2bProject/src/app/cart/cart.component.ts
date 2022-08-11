import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
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
  @Input('quantityInput') quantityInput?: ElementRef;

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
      this.GrandTotal += +prod.wholesale *prod.qty;
    }
    console.log(this.GrandTotal)


  }
  currentQuantity(quantity:any,index:number,prevQuantity:number) {
    // if (quantity > prevQuantity){
    //   this.GrandTotal = (this.GrandTotal + (this.products[index].wholesale * quantity)) - this.products[index].wholesale * prevQuantity;
    // }else{
    //   this.GrandTotal = (this.GrandTotal - (this.products[index].wholesale * quantity)) + this.products[index].wholesale * prevQuantity;
    // }
    // console.log(quantity);
    // console.log(prevQuantity);
    this.products[index].qty = quantity;
    localStorage.setItem("products",JSON.stringify(this.products));
    window.location.reload();


  }


  removeOne(item: any, index: number){

      this.GrandTotal -= this.products[index].wholesale
      this.products =this.cartService.removeItem(index);

      localStorage.setItem("products",JSON.stringify(this.products));
      this.products = JSON.parse(<string>localStorage.getItem("products") ) ;
      console.log(this.products)
      this.length = this.products.length;


  }



  clearAll(){
    this.products = this.cartService.clearCart();
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
