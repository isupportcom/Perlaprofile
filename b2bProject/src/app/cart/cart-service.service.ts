import { Injectable } from '@angular/core';
import { product } from '../AdminArea/adminareaproducts/adminareaproducts.component';

import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import axios from 'axios';
import { group } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  itemsToCart: any = [];
  date = new Date();

  id: any;

  openOffer = new Subject<any>();
  castOpenOffer = this.openOffer.asObservable();

  sendOpenOffer(prod: any) {
    this.openOffer.next(prod);
  }

  addImagePopup = new Subject<any>();
  castAddImagePopup = this.addImagePopup.asObservable();

  sendAddImagePopup(prod: any) {
    this.addImagePopup.next(prod);
  }

  loadedUser = JSON.parse(localStorage.getItem("userData") || '{}')

  productAdded = new Subject<boolean>();
  cast = this.productAdded.asObservable();

  sendProductAdded(flag: boolean) {
    this.productAdded.next(flag);
  }

  startScope = new Subject<boolean>();
  castSendStartScope = this.startScope.asObservable();

  sendStartScope(flag: boolean) {
    this.startScope.next(flag);
  }

  productAddedToFav = new Subject<boolean>();
  castProductAddedToFav = this.productAddedToFav.asObservable();

  sendProductAddedToFav(flag: boolean) {
    this.productAddedToFav.next(flag);
  }

  searchResult = new Subject<product>();
  searchCast = this.searchResult.asObservable();

  searchResults(products: any) {
    this.searchResult.next(products);
  }

  productCount = new Subject<number>();
  castProductCount = this.productCount.asObservable();

  sendProductCount(amount: number) {
    this.productCount.next(amount);
  }

  atCheckout = new Subject<boolean>();
  castAtCheckout = this.atCheckout.asObservable();
  sendAtCheckout(flag: boolean) {
    this.atCheckout.next(flag);
  }
  flag: boolean = false;
  shouldContinue = new BehaviorSubject<boolean>(this.flag);
  // castShouldContinue = this.shouldContinue.asObservable();
  // sendShouldContinue(flag: boolean){
  //   this.shouldContinue.next(flag);
  // }

  items: product[] | any = [];
  index: number = 0;

  constructor(private router: Router, private http: HttpClient) {}

  removeItem(index: any) {
    let loadedUser = JSON.parse(localStorage.getItem('userData') || '{}');
    axios
      .post('https://perlarest.vinoitalia.gr/php-auth-api/removeCartItem.php', {
        trdr: loadedUser.trdr,
        id: 2,
      })
      .then((resData) => {
        console.log(resData);
      });
  }

  setItemsToCartArray(itemsToCart: any) {
    this.itemsToCart.push(itemsToCart);
    console.log(this.getItemsToCartArray());
  }

  getItemsToCartArray() {
    return this.itemsToCart;
  }

  setId(id: any) {
    this.id = id;
  }

  removeOneFav(product:any){
    console.log(product);
    

    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/favorites.php",
    {
      mtrl:product.mtrl,
      trdr:this.loadedUser.trdr,
      mode:"deleteOne"
    })
    .then(resData=>{
    })

    
  }

  addToFavorites(product:product|any){
    console.log(product.mtrl);

  let loadedUser = JSON.parse(localStorage.getItem('userData')||'{}');
  
  
  axios.post("https://perlarest.vinoitalia.gr/php-auth-api/favorites.php",
  {
    mtrl:product.mtrl,
    trdr:loadedUser.trdr,
    mode:"insert"
  })
  .then(resData=>{
    console.log(resData);

  })

  }

  addToCart(product: product | any,animate?: boolean) {
    let loadedUser = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(loadedUser.trdr);
    console.log(product);

    console.log(product.img);
    console.log(product.image);
    console.log(product);
    let image;
    let category = '23';

    if (product.img != undefined) {
      image = product.img;
    } else {
      image = product.image;
    }

    let price;
    if (product.hasOffer) {
      price = product.offer;
    } else {
      price = product.wholesale;
    }
    console.log(price);
    console.log(product);

    let productAdded = true;
    localStorage.setItem('productAdded', 'true');


    

    let discount:any;
    if(product.discound == 0){
        discount = -1;
    }else{
      discount = product.discound;
    }
    console.log(product.discount);
    console.log(this.id);
    console.log(loadedUser.trdr);
    if(this.id == undefined){
      this.id = product.mtrl;
    }
    console.log(this.id);

    let qty
    if(product.qty == undefined){
      qty=1;
    }else{
      qty=product.qty
    }
    axios
      .post('https://perlarest.vinoitalia.gr/php-auth-api/addToCart.php', {
        mtrl: product.mtrl,
        trdr: loadedUser.trdr,
        code: product.code,
        name: product.name,
        name1: product.name1,
        img: image,
        category: category,
        qty: qty,
        retail: product.retail,
        wholesale: price,
        stock: product.stock,
        group_id: this.id,
        discound: discount,
      })
      .then((resData) => console.log(resData.data));
  }

  getItems() {
    let loadedUser = JSON.parse(localStorage.getItem('userData') || '{}');

    return this.http.post(
      'https://perlarest.vinoitalia.gr/php-auth-api/fetchCartItems.php',
      {
        trdr: loadedUser.trdr,
      }
    );
  }
  clearCart() {
    this.items = [];
    this.sendProductCount(0);
    return this.items;
  }

  setIndex(index: number) {
    this.index = index;
  }
}
