import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {NgForm} from "@angular/forms";
import {ProductsService} from "../../../porducts/products.service";
import {CartServiceService} from "../../../cart/cart-service.service";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
code:string = "";
name:string = "";
string:string |any;
id:number |any;
  constructor(
    private cartServiceService :CartServiceService
  ) { }

  ngOnInit(): void {
  }
  findAndDisplay(event:any){

    console.log(this.code != "")
    if(this.code != ""){
      console.log(this.code)
      this.string = this.code;
      this.code = ""
      this.id=1

    }else{
      console.log(this.name);
      this.string = this.name;
      this.id = 2
      this.name = "";
    }
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/search.php",{
      search:this.string,
      id: this.id
    })
      .then(resData=>{
        console.log(resData.data)
        if(resData.data.products.length ==0){
          console.log(resData.data.message);
        }else{
          this.cartServiceService.searchResults(resData.data.products)
        }


      })

  }

}
