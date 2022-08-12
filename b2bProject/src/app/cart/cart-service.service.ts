import { Injectable } from '@angular/core';
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";

import {BehaviorSubject, Subject} from "rxjs"
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
  
  atCheckout = new Subject<boolean>();
  castAtCheckout = this.atCheckout.asObservable();
  sendAtCheckout(flag: boolean){
    this.atCheckout.next(flag);
  }
  flag: boolean = false;
  shouldContinue = new BehaviorSubject<boolean>(this.flag);
  // castShouldContinue = this.shouldContinue.asObservable();
  // sendShouldContinue(flag: boolean){
  //   this.shouldContinue.next(flag);
  // }

  items :product[] | any =[];
  index :number = 0
  

  constructor(private router: Router) { }

  removeItem(index: number){
    let temp  = JSON.parse(localStorage.getItem("products") || '{}')
    temp.splice(index,1);
    return temp

  }

  addToCart(product:product){
    
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
