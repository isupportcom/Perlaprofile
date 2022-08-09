import { Injectable } from '@angular/core';
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  items :product[] =[];
  index :number = 0
  len:number = this.items.length;
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
  clearOne(index:number){
    this.items[index] =  [];
    return this.items[index];
  }
  getLen(){
    return this.len;
  }
  setLen(len:number){
    this.len = len;
  }

  setIndex(index:number){
    this.index = index;
  }
  getIndex(){
    return this.index;
  }



}
