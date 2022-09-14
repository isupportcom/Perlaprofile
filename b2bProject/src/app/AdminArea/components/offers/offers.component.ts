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
  offer:any =[];
  answer:string =""
  checkBoxes: any = document.getElementsByClassName("yoyo");
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      product: [null],
      offer:[null],
      show:[false]
    });
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php").then(resData => {
      // console.log(resData.data)
      console.log(resData.data)
      for (let i = 0; i < resData.data.products.length; i++) {

        this.products[i] = {
          mtrl: resData.data.products[i].mtrl,
          name: resData.data.products[i].name
        }
      }
    })
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/getAllOffers.php",{
      product:"product",
      offer:"offer"
    }).then(resData=>{

      this.offer = resData.data.offers
      console.log(this.offer)
    })
  }
  uploadOffer(){
    console.log(this.contactForm.value)
    console.log("Submitted")

    if(this.contactForm.value.show == null){
      this.contactForm.value.show = false;
    }else{
      this.contactForm.value.show = true
    }
    console.log(this.contactForm.value)
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/offers.php",this.contactForm.value)
      .then(resData=>{
        this.answer = resData.data.message
        // setTimeout(()=>{
        //   window.location.reload()
        // },500)
      })
  }
  setName(product:any){
    console.log(product)
    this.name = product;
  }
  getName(){
    return this.name
  }
  test(e:any){
    let flag: boolean;
    if (e.target.checked == true){
      flag = true;
    }else{
      flag = false;
    }

    // console.log(this.checkBoxes[0])
    // console.log(e.target.checked)
    for(let i =0;i<this.checkBoxes.length;i++){
      this.checkBoxes[i].checked = false;
    }

    if (flag){
      e.target.checked = true;
    }
    else{
      e.target.checked = false;
    }
  }



}
