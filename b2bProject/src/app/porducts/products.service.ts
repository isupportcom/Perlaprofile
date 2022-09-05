import {Injectable} from "@angular/core";
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";
import {Subject} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Category } from "./categories.model";




@Injectable({
    providedIn: "root"
    }
)
export  class ProductsService {
  singleProduct : product | any
  products: product [] = [];
  allCategories: any = [];
  mainCategories: any = [];

  constructor(private http: HttpClient,) {}

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

 getAllCategories(){
    return  this.http.get(
        'https://perlarest.vinoitalia.gr/php-auth-api/getAllCategories.php/?id=7&method=allCategories');
 }

 getAllProducts(){
    return this.http.get(
        'https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php/?id=2&method=allProducts/'
    );
 }

 getMainCategories(){
    return this.http.get('https://perlarest.vinoitalia.gr/php-auth-api/getAllMainCat.php/?id=8&method=allMainCategories');
 }

 setAllCategoriesArray(arr: any){
    for(let i=0;i<arr.length;i++){
        this.allCategories[i] = arr[i];
    }

 }


 setMainCategoriesArray(arr: any){
    for(let i=0;i<arr.length;i++){
        this.mainCategories[i] = arr[i];
    }
 }

 getMainCategoriesArray(){
    return this.mainCategories;
 }


 getCategoriesArray(){
    return this.allCategories;
 }



}
