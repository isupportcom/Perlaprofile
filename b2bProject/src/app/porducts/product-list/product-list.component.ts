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
    axios.get("https://testdatabaseconection.whouse.gr/backup/index.php/?id=2").then(resData => {
      // console.log(resData.data)
      for (let i = 0; i < resData.data.length; i++) {
        // @ts-ignore
        this.product[i] = {
          mtrl: resData.data[i].mtrl,
          name: resData.data[i].name,
          name1: resData.data[i].name1,
          code: resData.data[i].code,
          retail: resData.data[i].retailPrice,
          wholesale: resData.data[i].wholesalePrice

        }
      }
      this.totalLength = this.product.length;
      console.log(this.totalLength)

    })
  }
  // this.productsService.cast.subscribe((res: any) => {
  //   this.product = res;

  // console.log(this.product);


}
