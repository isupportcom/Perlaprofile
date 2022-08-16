import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/AdminArea/adminareaproducts/adminareaproducts.component';
import {ProductsService} from "../products.service";
import axios from "axios";
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product :product |any =[];
  constructor(private productsService: ProductsService) { }

  totalLength:number | undefined;
  page:number = 1;


  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem("products") || '{}'))
    axios.get("https://perlaprodileapi.isupport.com.gr/index.php?id=2").then(resData => {
      // console.log(resData.data)
      console.log(resData.data)
      for (let i = 0; i < resData.data.length; i++) {
        // @ts-ignore
        this.product[i] = {
          mtrl: resData.data[i].mtrl,
          name: resData.data[i].name,
          name1: resData.data[i].name1,
          code: resData.data[i].code,
          retail: resData.data[i].retailPrice,
          wholesale: resData.data[i].wholesalePrice,
          qty :1,
          stock :resData.data[i].stock

        }
      }
      this.totalLength = this.product.length;

    })
  }
  // this.productsService.cast.subscribe((res: any) => {
  //   this.product = res;

  // console.log(this.product);


}
