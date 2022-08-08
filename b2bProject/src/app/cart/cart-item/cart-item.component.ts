import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../porducts/products.service";
import {product} from "../../AdminArea/adminareaproducts/adminareaproducts.component";
import {CartServiceService} from "../cart-service.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  product :product|any;
  constructor(
    private cartService: CartServiceService
  ) { }

  ngOnInit(): void {
    this.product = this.cartService.getItems();
    console.log(this.product)
  }

}
