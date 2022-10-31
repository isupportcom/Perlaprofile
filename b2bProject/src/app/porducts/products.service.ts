import {Injectable} from "@angular/core";
import {product} from "../AdminArea/adminareaproducts/adminareaproducts.component";
import {BehaviorSubject, Subject} from "rxjs";
import { HttpClient } from "@angular/common/http";
// import { Category } from "./categories.model";
import { ActivatedRoute, Router } from "@angular/router";
import axios from "axios";




@Injectable({
    providedIn: "root"
    }
)
export  class ProductsService {
  singleProduct : product | any;
  products: product [] = [];
  allCategories: any = [];
  mainCategories: any = [];
  mainCategory: any;
  filters: any;

  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute) {}


  mosquiProductFound = new Subject<any>();
  castMosquiProductFound = this.mosquiProductFound.asObservable();

  sendMosquiProductFound(product: any){
    this.mosquiProductFound.next(product);
  }

  prevfilters = new BehaviorSubject<any>(null);
//   prevfilters = new BehaviorSubject<any>(null)();


  sendFilters(filters: any) {
    this.prevfilters.next(filters);
  }

 setSingleProduct(prod:product | any){
    this.singleProduct = prod;
    localStorage.setItem("single",JSON.stringify(this.singleProduct))
    console.log(prod);
 }



 setAll(item:product){

     this.products.push(item);

 }
 getAll(){
     return this.products
 }

 getSingelProduct(){
     return JSON.parse(localStorage.getItem("single")||'{}');
 }

 getAllCategories(id:any){
    return  this.http.post(
        'https://perlarest.vinoitalia.gr/php-auth-api/getAllCategories.php',{category:id});
 }

 getAllProducts(){
    return this.http.get(
        'https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php/?id=2&method=allProducts/'
    );
 }

 getMainCategories(){
    return this.http.get('https://perlarest.vinoitalia.gr/php-auth-api/getAllMainCat.php/?id=8&method=allMainCategories');
 }

 getRelatedProducts(mtrl: any){
  console.log(mtrl);

    return this.http.post('https://perlarest.vinoitalia.gr/php-auth-api/findRelatedProduct.php',
    {
        product_mtrl: mtrl
    });
 }

 setGrouping(mtrl:any,grouping: any){
    return this.http.post('https://perlarest.vinoitalia.gr/php-auth-api/addProductBasedOnGrouping.php',
    {
        product_mtrl : mtrl ,
        grouping : grouping
    })
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

 setMainCategory(mainCategory: any){
    this.mainCategory = mainCategory
 }

 getMainCategory(){
    return this.mainCategory;
 }

}
