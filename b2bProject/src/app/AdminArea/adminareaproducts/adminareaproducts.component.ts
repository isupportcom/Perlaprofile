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
    wholesale:number
  };
}
@Component({
  selector: 'app-adminareaproducts',
  templateUrl: './adminareaproducts.component.html',
  styleUrls: ['./adminareaproducts.component.css']
})


export class AdminareaproductsComponent implements OnInit {
  totalProducts:any;
  product : product| any=[] ;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    axios.get("http://localhost/phpapi/Formated/index.php/?id=2").then(resData=>{
      // console.log(resData.data)
      for(let i = 0 ; i < resData.data.length;i++){
        // @ts-ignore
        this.product[i] ={
          mtrl: resData.data[i].mtrl,
          name     : resData.data[i].name,
          name1    : resData.data[i].name1,
          code     : resData.data[i].code,
          retail   : resData.data[i].retailPrice,
          wholesale: resData.data[i].wholesalePrice

        }
        console.log(this.product[i])


      }
    })
  }
  updateDatabase(){
    axios.get("http://localhost/phpapi/Formated/index.php/?id=2").then(resData=>{
        // console.log(resData.data)
      for(let i = 0 ; i < resData.data.length;i++){
        this.product[i] ={
          mtrl     : resData.data[i].mtrl,
          name     : resData.data[i].name,
          name1    : resData.data[i].name1,
          retail   : resData.data[i].retailPrice,
          wholesale: resData.data[i].wholesalePrice

        }
        console.log(this.product[i])


      }
    })
  }

}
