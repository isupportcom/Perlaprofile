import { Injectable } from '@angular/core';
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  items :product[] =[];

  constructor() { }

  addToCart(product:product){
    this.items.push(product);
  }
  getItems(){
    return this.items;
  }
  clearCart(){
    this.items = [];
    return this.items;
  }

}
