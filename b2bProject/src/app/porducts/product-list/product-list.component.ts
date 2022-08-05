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
  public totalProducts = [11,12,13,1,21,2,21];
  product :product |any =[];
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    axios.get("http://localhost/phpapi/Formated/index.php/?id=2").then(resData => {
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
        console.log(this.product[i])
      }
      this.productsService.sendProducts(this.product);
    })
  }
    // this.productsService.cast.subscribe((res: any) => {
    //   this.product = res;

    // console.log(this.product);


}
