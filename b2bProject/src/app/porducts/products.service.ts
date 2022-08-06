import {Injectable} from "@angular/core";
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root"
  }
)
export  class ProductsService {
   singleProduct : product | any

 setSingleProduct(prod:product){
     this.singleProduct = prod;
 }
 getSingelProduct(){
     return this.singleProduct;
 }



}
