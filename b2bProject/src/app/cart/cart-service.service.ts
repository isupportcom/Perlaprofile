import { Injectable } from '@angular/core';
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";

import {Subject} from "rxjs"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  productAdded = new Subject<boolean>();
  cast = this.productAdded.asObservable();


  sendProductAdded(flag: boolean){
    this.productAdded.next(flag);
  }

  items :product[] | any =[];
  index :number = 0

  constructor(private router: Router) { }

  removeItem(index: number){
    let temp  = JSON.parse(localStorage.getItem("products") || '{}')
    temp.splice(index,1);
    return temp

  }

  addToCart(product:product){
    this.items = JSON.parse(localStorage.getItem("products") || '{}')
    let productAdded = true;
    localStorage.setItem('productAdded', 'true');
    this.sendProductAdded(localStorage.getItem('productAdded') == 'true'? true : false);
    this.items.push(product);

  }
  getItems(){
    return this.items
  }
  clearCart(){
    this.items = [];
    return this.items;
  }

  setIndex(index:number){
    this.index = index;
  }


}
