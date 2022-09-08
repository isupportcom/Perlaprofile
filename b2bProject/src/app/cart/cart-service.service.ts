import { Injectable } from '@angular/core';
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";

import {BehaviorSubject, Subject} from "rxjs"
import { Router } from '@angular/router';
import axios from 'axios';
import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  itemsToCart: any = [];
  date = new Date();
  id: any;
  

  productAdded = new Subject<boolean>();
  cast = this.productAdded.asObservable();

  sendProductAdded(flag: boolean){
    this.productAdded.next(flag);
  }
  searchResult = new Subject<product>();
  searchCast  = this.searchResult.asObservable();

  searchResults(products:any){
    this.searchResult.next(products);
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


  constructor(private router: Router,private http: HttpClient) { }

  removeItem(index: any){
    let loadedUser = JSON.parse(localStorage.getItem("userData")|| '{}');
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/removeCartItem.php",
    {
      trdr:loadedUser.trdr,
      id:2,
      
    }
    ).then(resData=>{console.log(resData);
    })

  }

  setItemsToCartArray(itemsToCart: any){
    
    
    this.itemsToCart.push(itemsToCart)
    console.log(this.getItemsToCartArray());
  }

  getItemsToCartArray(){
    return this.itemsToCart;
  }

  setId(id: any){
    this.id = id;
  }

  addToCart(product:product|any){
    let loadedUser = JSON.parse(localStorage.getItem("userData")|| '{}');
    console.log(loadedUser.trdr);
    console.log(this.id);
    

    

    this.items = JSON.parse(localStorage.getItem("products") || '{}')
    let productAdded = true;
    localStorage.setItem('productAdded', 'true');
    this.sendProductAdded(localStorage.getItem('productAdded') == 'true'? true : false);

    let category = 'sta arxidia moy se grafw'; 
    let img;
    if(product.img != undefined){
      img = product.img;
    }
    else{
      img = product.image
    }

    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/addToCart.php",{
      mtrl:     product.mtrl,
      trdr:     loadedUser.trdr,
      code:     product.code,
      name:     product.name,
      name1:    product.name1,
      img:      img,
      category: category,
      qty:      product.qty,
      retail:   product.retail,
      wholesale:product.wholesale,
      stock:    product.stock,
      group_id: this.id
    }).then(resData=>console.log(resData.data))
    // let flag = false
    // let index = 0;
    // for(let i = 0 ; i <this.items.length;i++){
    //   if(this.items[i].mtrl == product.mtrl){
    //     flag = true;
    //     index = i ;
    //   }
    // }
    // if(flag){
    //   console.log(this.items[index].qty);
    //   console.log(this.items[index].stock);


    //   if(this.items[index].qty < this.items[index].stock){
    //     this.items[index].qty++;
    //     this.sendProductCount(this.items.length);
    //   }
    //   else{
    //     return;
    //   }

    // }else{
    //   this.items.push(product);
    //   this.sendProductCount(this.items.length);
    // }
    

  }








  getItems(){
   let loadedUser = JSON.parse(localStorage.getItem("userData") || '{}')

    return this.http.post("https://perlarest.vinoitalia.gr/php-auth-api/fetchCartItems.php",
    {
      trdr:loadedUser.trdr
    })
    

  }
  clearCart(){
    this.items = [];
    this.sendProductCount(0);
    return this.items;

  }

  setIndex(index:number){
    this.index = index;

  }


}
