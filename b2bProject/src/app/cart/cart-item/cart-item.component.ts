import {Component, Input, OnInit} from '@angular/core';
import {product} from "../../AdminArea/adminareaproducts/adminareaproducts.component";
import {CartServiceService} from "../cart-service.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
@Input() index:number |any;
@Input() item : product |any

  constructor(
    private cartService: CartServiceService
  ) { }

  ngOnInit(): void {
    console.log(this.index);
  }

  removeItem(){
    this.cartService.setIndex(this.index);
  }

}
