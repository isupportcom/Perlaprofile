import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {product} from "../../adminareaproducts/adminareaproducts.component";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  products:product|any=[];
  contactForm:FormGroup|any;
  name:string ="";
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      product: [null],
      offer:[null]
    });
    axios.get("https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php?id=2&method=allProducts").then(resData => {
      // console.log(resData.data)
      console.log(resData.data)
      for (let i = 0; i < resData.data.length; i++) {

        this.products[i] = {
          mtrl: resData.data[i].mtrl,
          name: resData.data[i].name
        }
      }
    })
  }
  uploadOffer(){
    console.log(this.contactForm.value)
    console.log("Submitted")
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/offers.php",this.contactForm.value)
      .then(resData=>{
        console.log(resData.data);
      })
  }
  setName(product:any){
    console.log(product)
    this.name = product;
  }
  getName(){
    return this.name
  }
}
