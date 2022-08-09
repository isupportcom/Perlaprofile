import {Component, Input, OnInit} from '@angular/core';
import {product} from "../../AdminArea/adminareaproducts/adminareaproducts.component";
import {CartServiceService} from "../cart-service.service";
import {CartComponent} from "../cart.component";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
@Input() index:number |any;
@Input() item : product |any
@Input() productsLen : number | any
  constructor(
    private cartService: CartServiceService,
    private cartComponent :CartComponent
  ) { }

  ngOnInit(): void {
  console.log(this.index);
  console.log(this.item)
  }

  removeItem(){
    this.item = null
    this.productsLen = this.productsLen -1;
    this.cartService.setLen(this.productsLen)
    this.cartComponent.onChangeLen()


  }

}
