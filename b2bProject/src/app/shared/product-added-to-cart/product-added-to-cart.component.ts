import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartServiceService } from 'src/app/cart/cart-service.service';

@Component({
  selector: 'app-product-added-to-cart',
  templateUrl: './product-added-to-cart.component.html',
  styleUrls: ['./product-added-to-cart.component.css']
})
export class ProductAddedToCartComponent implements OnInit{
  
  constructor(private cartService: CartServiceService) { }

  ngOnInit(): void {

  }

}
