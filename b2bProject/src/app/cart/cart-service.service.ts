import { Injectable } from '@angular/core';
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";

import {Subject} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  items :product[] =[];
  index :number = 0

  constructor() { }
  len = new Subject<number>()
  cast = this.len.asObservable();
  sendLen(index:number){

    this.len.next(index);
    return this.len

  }


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

  setIndex(index:number){
    this.index = index;
  }


}
