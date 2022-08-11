import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import axios from "axios"
export interface product {
  [index: number]: {
    mtrl:string,
    name:string,
    name1:string,
    code:string
    retail:number,
    wholesale:number,
    qty:number
    show?: boolean
  };
}
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

