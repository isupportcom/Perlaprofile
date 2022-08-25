import { Component, OnDestroy, OnInit } from '@angular/core';
import { product } from 'src/app/AdminArea/adminareaproducts/adminareaproducts.component';
import {ProductsService} from "../products.service";
import axios from "axios";
import { Category } from '../categories.model';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

interface mainCat{
  id: number,
  name: string
}

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
  mainCategory: mainCat = {
    id: 0,
    name: ''
  };
  subcategories: any = [];
  cat_id?: number;
  subcat_id?: number;
  shownProducts :product |any =[];
  filterOn?: boolean;
  noProducts?: boolean;
  checkboxes: any = document.querySelectorAll('.checkbox');
  listArray: any = [];
  checked?: boolean;

  ngOnInit(): void {

    console.log(JSON.parse(localStorage.getItem("products") || '{}'))
    axios.get("https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php/?id=2&method=allProducts").then(resData => {
      // console.log(resData.data)
      console.log(resData.data)
      for (let i = 0; i < 250; i++) {
        console.log(resData.data[i].image)
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
          subcategory: resData.data[i].subcategory,
          img:"https://perlarest.vinoitalia.gr/php-auth-api/upload/"+resData.data[i].image
        }
        this.productsService.setAll(this.product[i])
      }
      // console.log(this.product);

      this.totalLength = this.product.length;



    })

    this.route.params.subscribe(params => {
      console.log(params);

      console.log(+params['cat_id']);
      console.log(params['cat_name']);

      this.mainCategory.id = +params['cat_id'];

      this.mainCategory.name = params['cat_name'];


    })
    console.log(this.mainCategory);

    this.productsService.getAllCategories().subscribe(resData => {
      this.productsService.setAllCategoriesArray(resData);
    })

    this.categories = this.productsService.getCategoriesArray();
    console.log(this.categories);


    this.productsService.getMainCategories().subscribe(resData => {
      this.productsService.setMainCategoriesArray(resData);
    })
    // this.mainCategories = this.productsService.getMainCategoriesArray();
    // console.log(this.mainCategories);



    // this.route.params.subscribe(params => {
    //   this.cat_id = +params['cat_id'];
    //   this.subcat_id = +params['subcat_id'];
    // })

    // if(this.cat_id == 0 && this.subcat_id == 0){
      // this.noProducts = false
      // this.filterOn = false;
      // this.shownProducts = this.productsService.getAll();
    // }
    // else{
      // this.filterOn = true;
      // let temp = this.productsService.getAll();
      // let i = 0;
      // for(let product of temp){
      //   if(product.category == this.cat_id && product.subcategory == this.subcat_id){
      //     this.shownProducts[i++] = product;
      //   }
      // }
      // if(this.shownProducts.length > 0){
      //   this.noProducts = false;
      // }
      // else{
      //   this.noProducts = true;
      // }
    // }

    this.updateProducts();


  }
  // this.productsService.cast.subscribe((res: any) => {
  //   this.product = res;

  // console.log(this.product);

  handleCheckboxes(e: any){

    if(e.target.checked){
      this.listArray.push(e.target.value);
      this.updateProducts();
    }
    else{
      // this.listArray = this.listArray.filter((e: any) => e !== this.value)
      // console.log('hello');
      for(let i=0;i<this.listArray.length;i++){
        if(e.target.value == this.listArray[i]){
          this.listArray.splice(i,1);
        }
      }
      this.updateProducts();
    }
    this.checked = true;


    console.log(this.listArray);


  }

  updateProducts(){

    if(this.listArray.length == 0){
      this.noProducts = false
      this.filterOn = false;
      let temp = this.productsService.getAll();
      if(this.shownProducts.length == 0){
        for(let product of temp){
          let flag = false;
          if(product.category == this.mainCategory.id){
            for(let el of this.shownProducts){
              if(product.mtrl == el.mtrl){
                console.log("mpastardo");

                flag = true;
              }
            }
            if(!flag){
              this.shownProducts.push(product);
            }
          }
        }
      }

      if(this.shownProducts.length == 0){
        this.noProducts = true;
      }

    }
    else{
      console.log('HEHE');

      this.filterOn = true;
      let temp = this.productsService.getAll();

      this.shownProducts = [];

      let i = 0;


        for(let subcat of this.listArray){

          console.log(subcat);

          for(let product of temp){
            if(product.subcategory == subcat){
              this.shownProducts[i++] = product;
            }
          }
        }
      console.log(this.shownProducts);
      if(this.shownProducts.length > 0){
        this.noProducts = false;
      }
      else{
        this.noProducts = true;
      }
    }
  }

  handleClearFilters(){
    this.filterOn = false;
    this.listArray = [];
    window.location.reload();
  }

  getSubcategories(){
    let i=0;
    for(let category of this.categories){
      if(category.id == this.mainCategory.id){
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
    console.log("hello");

    this.shownProducts = [];
  }

}
