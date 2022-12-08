import { singleProduct } from './../AdminArea/adminareaproducts/adminareaproducts.component';
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


  singleProductMtrl = new Subject<any>();
  castSingleProductMtrl = this.singleProductMtrl.asObservable();

  sendSingleProductMtrl(mtrl: any){
   this.singleProductMtrl.next(mtrl);
  }

  suggProd = new Subject<any>();
  castSuggProd = this.suggProd.asObservable();

  sendSuggProd(prod: any){
   this.suggProd.next(prod);
  }


  backOrderPopup2 = new Subject<boolean>();
  castBackOrderPopup2 = this.backOrderPopup2.asObservable();

  sendBackOrderPopup2(flag: boolean){
   this.backOrderPopup2.next(flag)
  }

  backOrder2 = new Subject<boolean>();
  castBackOrder2 = this.backOrder2.asObservable();

  sendBackOrder2(flag: boolean){
   this.backOrder2.next(flag)
  }


  backOrderPopup3 = new Subject<boolean>();
  castBackOrderPopup3 = this.backOrderPopup3.asObservable();

  sendBackOrderPopup3(flag: boolean){
   this.backOrderPopup3.next(flag)
  }

  backOrder3 = new Subject<boolean>();
  castBackOrder3 = this.backOrder3.asObservable();

  sendBackOrder3(flag: boolean){
   this.backOrder3.next(flag)
  }

  backOrderPopup = new Subject<boolean>();
  castBackOrderPopup = this.backOrderPopup.asObservable();

  sendBackOrderPopup(flag: boolean){
   this.backOrderPopup.next(flag)
  }

  backOrder = new Subject<boolean>();
  castBackOrder = this.backOrder.asObservable();

  sendBackOrder(flag: boolean){
   this.backOrder.next(flag)
  }

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
    return  this.http.get(
        'https://perlanoderest.vinoitalia.gr/categories/getCategories',{params:{category:id}});
 }

 getAllProducts(){
    return this.http.get(
      'https://perlanoderest.vinoitalia.gr/products/getProducts'
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

 async setGrouping(mtrl:any,grouping: any){



    return await this.http.post('https://perlanoderest.vinoitalia.gr/products/addProductBasedOnGrouping',
    {
        product_mtrl : mtrl ,
        grouping : grouping
    })
 }

 setAllCategoriesArray(arr: any){
    console.log(arr);
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
   console.log(this.allCategories.length);

    return this.allCategories;
 }

 setMainCategory(mainCategory: any){
    this.mainCategory = mainCategory
 }

 getMainCategory(){
    return this.mainCategory;
 }

}
