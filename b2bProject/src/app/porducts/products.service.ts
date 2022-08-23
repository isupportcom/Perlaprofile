import {Injectable} from "@angular/core";
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root"
  }
)
export  class ProductsService {
   singleProduct : product | any
  products: product [] = []

 setSingleProduct(prod:product){
     this.singleProduct = prod;
     console.log(prod);
     
 }
 setAll(item:product){
     this.products.push(item);
     localStorage.setItem("allproducts",JSON.stringify(this.products));
 }
 getAll(){
     return JSON.parse(localStorage.getItem("allproducts") || '{}');
 }

 getSingelProduct(){
     return this.singleProduct;
 }



}
