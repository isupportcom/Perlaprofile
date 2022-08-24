import { Component, OnDestroy, OnInit } from '@angular/core';
import { product } from 'src/app/AdminArea/adminareaproducts/adminareaproducts.component';
import {ProductsService} from "../products.service";
import axios from "axios";
import { Category } from '../categories.model';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit , OnDestroy{
  
  constructor(private router: Router,private productsService: ProductsService,private route: ActivatedRoute) { }


  product :product |any =[];
  totalLength:number | undefined;
  page:number = 1;
  categories: any = [];
  mainCategories : any = [];
  subcategories: any = [];
  cat_id?: number;
  subcat_id?: number;
  shownProducts :product |any =[];
  filterOn?: boolean;;

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem("products") || '{}'))
    axios.get("https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php/?id=2&method=allProducts/").then(resData => {
      // console.log(resData.data)
      console.log(resData.data)
      for (let i = 0; i < resData.data.length; i++) {

        this.product[i] = {
          mtrl: resData.data[i].mtrl,
          name: resData.data[i].name,
          name1: resData.data[i].name1,
          code: resData.data[i].code,
          retail: resData.data[i].retailPrice,
          wholesale: resData.data[i].wholesalePrice,
          qty :1,
          stock :resData.data[i].stock,
          category: resData.data[i].category,
          subcategory: resData.data[i].subcategory
        }
        this.productsService.setAll(this.product[i])
      }
      // console.log(this.product);
      
      this.totalLength = this.product.length;
      

     
    })

    this.productsService.getAllCategories().subscribe(resData => {
      this.productsService.setAllCategoriesArray(resData);
    })

    this.categories = this.productsService.getCategoriesArray();    
    console.log(this.categories);
    
    
    this.productsService.getMainCategories().subscribe(resData => {
      this.productsService.setMainCategoriesArray(resData);
    }) 
    this.mainCategories = this.productsService.getMainCategoriesArray();
    console.log(this.mainCategories);
    

    this.route.params.subscribe(params => {
      this.cat_id = +params['cat_id'];
      this.subcat_id = +params['subcat_id'];
    })
    
    if(this.cat_id == 0 && this.subcat_id == 0){
      this.filterOn = false;
      this.shownProducts = this.productsService.getAll();      
    }
    else{
      this.filterOn = true;
      let temp = this.productsService.getAll();
    
      
      let i = 0;
      for(let product of temp){
        if(product.category!=0 || product.subcategory != 0){
          console.log("poutsa");
          
        }else{
          console.log("mouni");
          
        }
        
        

        if(product.category == this.cat_id && product.subcategory == this.subcat_id){
          console.log('hello');
          
          
          
          this.shownProducts[i++] = product;
        }
      }
      console.log(this.shownProducts); 
    }
    
    
  
  }
  // this.productsService.cast.subscribe((res: any) => {
  //   this.product = res;

  // console.log(this.product);

  handleClearFilters(){
    this.filterOn = false;
    this.router.navigate(['products',0,0]);
    setTimeout(() => {
      window.location.reload();
    },50)
  }

  getSubcategories(mainCategory: any){
    let i=0;
    for(let category of this.categories){
      if(category.id == mainCategory.id){
        this.subcategories[i++] = category; 
      }
    }
    return this.subcategories;
  }


  handleFilter(mainCategory: any,subcategory:any){
    this.filterOn = true;
    this.router.navigate(['products',mainCategory.id,subcategory.sub_id]);
    setTimeout(() => {
      window.location.reload();
    },50)
  }

  ngOnDestroy(): void {
    this.shownProducts = [];
  }
  
}
