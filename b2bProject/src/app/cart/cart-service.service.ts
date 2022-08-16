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

  productCount = new Subject<number>();
  castProductCount = this.productCount.asObservable();

  sendProductCount(amount: number){
    this.productCount.next(amount);
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
    this.sendProductCount(temp.length);
    temp.splice(index,1);
    return temp
  }

  addToCart(product:product|any){
    this.items = JSON.parse(localStorage.getItem("products") || '{}')
    let productAdded = true;
    localStorage.setItem('productAdded', 'true');
    this.sendProductAdded(localStorage.getItem('productAdded') == 'true'? true : false);
    let flag = false
    let index = 0;
    for(let i = 0 ; i <this.items.length;i++){
      if(this.items[i].mtrl == product.mtrl){
        flag = true;
        index = i ;
      }
    }
    if(flag){
      this.items[index].qty++;
    }else{
      this.items.push(product);
    }





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
