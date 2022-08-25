import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../../porducts/products.service";
import {product} from "../../adminareaproducts/adminareaproducts.component";
import axios from "axios";

@Component({
  selector: 'app-insert-products',
  templateUrl: './insert-products.component.html',
  styleUrls: ['./insert-products.component.css']
})
export class InsertProductsComponent implements OnInit {
  products: product | any = [];
  page: number = 1;

  constructor(
    private productsService: ProductsService
  ) {
  }

  ngOnInit() {
    axios.get("https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php/?id=2&method=allProducts").then(resData => {
      // console.log(resData.data)
      console.log(resData.data)
      for (let i = 0; i < resData.data.length; i++) {

        this.products[i] = {
          mtrl: resData.data[i].mtrl,
          name: resData.data[i].name,
          name1: resData.data[i].name1,
          code: resData.data[i].code,
          retail: resData.data[i].retailPrice,
          wholesale: resData.data[i].wholesalePrice,
          qty: 1,
          stock: resData.data[i].stock
        }
      }
    })
  }
}
