import { Injectable } from '@angular/core';
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  items :product[] =[];
  index :number = 0

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
  removeItem(index:number){
      delete this.items[index]
  }
  setIndex(index:number){
    this.index = index;
  }
  getIndex(){
    return this.index;
  }

}
