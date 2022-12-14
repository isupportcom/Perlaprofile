import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import axios from "axios"
export interface product {
  [index: number]: {
    mtrl:string|any,
    name:string,
    name1:string,
    code:string
    retail:number,
    wholesale:number,
    qty:number
    show?: boolean,
    stock:number,
    category: number,
    subcatergory: number,
    img:any,
    otherImages:any,
    offer:number,
    addedToFav: boolean,
    description:any
  };
}
export interface grouping {
  [index: number]: {
    scope1: any;
    scope2: any;
  }
}
export interface singleProduct {
    mtrl:string|any,
    name:string,
    name1:string,
    code:string
    retail:number,
    wholesale:number,
    qty:number
    show?: boolean,
    stock:number,
    category: number,
    subcatergory: number,
    img:any,
    otherImages:any,
    offer:number,
    addedToFav: boolean;
};
@Component({
  selector: 'app-adminareaproducts',
  templateUrl: './adminareaproducts.component.html',
  styleUrls: ['./adminareaproducts.component.css']
})


export class AdminareaproductsComponent implements OnInit {
  totalProducts:any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {




  }
  updateDatabase(){

  }

}

