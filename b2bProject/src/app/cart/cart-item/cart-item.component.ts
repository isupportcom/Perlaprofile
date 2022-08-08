import {Component, Input, OnInit} from '@angular/core';
import {product} from "../../AdminArea/adminareaproducts/adminareaproducts.component";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
@Input() index:product |any;

  constructor() { }

  ngOnInit(): void {
  }

}
