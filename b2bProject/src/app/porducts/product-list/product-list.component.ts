import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { product } from 'src/app/AdminArea/adminareaproducts/adminareaproducts.component';
import {ProductsService} from "../products.service";
import axios from "axios";
import { Category } from '../categories.model';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationControlsComponent } from 'ngx-pagination';

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

  @ViewChild('menu1') menu1!: ElementRef;
  @ViewChild('menu2') menu2!: ElementRef;

  constructor(private router: Router,private productsService: ProductsService,private route: ActivatedRoute,private renderer: Renderer2) { 
    this.renderer.listen('window', 'click',(e:Event)=>{
      console.log(e.target);
      console.log(this.menu2);
      
      if(e.target !== this.menu1.nativeElement && e.target !== this.menu2.nativeElement){
        console.log("Hello");
        
        this.showProductsPerPage = false;
        this.showSortOptions = false;
      }

      
    })

  }


  products :product |any =[];
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

  showProductsPerPage:boolean = false;
  showSortOptions: boolean = false;
  logoSource?: string;
  waiting: boolean = false;
  fits: boolean = true;
  itemsPP: number = 9;

  innerWidth!: number;
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth
    if(this.innerWidth <= 992){
      this.itemsPP = 4;
    }
    else{
      this.itemsPP = 9;
    }

    if(this.innerWidth <= 1200){
      this.fits = false;
    }else{
      this.fits = true;
    }
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 992){
      this.itemsPP = 4;
    }
    else{
      this.itemsPP = 9;
    }

    if(this.innerWidth <= 1200){
      this.fits = false;
    }else{
      this.fits = true;
    }

    console.log(JSON.parse(localStorage.getItem("products") || '{}'))
    axios.get("https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php?id=2&method=allProducts").then((resData:any) => {
      // console.log(resData.data)
      console.log(resData.data)
      for (let i = 0; i < resData.data.length; i++) {


        this.products[i] = {
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
          img:resData.data[i].image
        }
        this.productsService.setAll(this.products[i])
        // console.log(this.products[i].mtrl);
      }
      // console.log(this.product);

      this.totalLength = this.products.length;



    })

    this.route.params.subscribe(params => {
      console.log(params);

      console.log(+params['cat_id']);
      console.log(params['cat_name']);

      this.mainCategory.id = +params['cat_id'];

      this.mainCategory.name = params['cat_name'];


      localStorage.setItem('currentCategory', JSON.stringify(this.mainCategory));

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

    if(this.mainCategory.id === 114){
      this.logoSource = '../../../assets/control-logo-white-with-green.svg';
    }
    else if(this.mainCategory.id === 115){
      this.logoSource = '../../../assets/motion-logo-white-with-green.svg';
    }
    else if(this.mainCategory.id === 116){
      this.logoSource = '../../../assets/mosqui-logo-white-with-green.svg';
    }    else if(this.mainCategory.id === 117){
      this.logoSource = '../../../assets/profile-logo-white-with-green.svg';
    }
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
      this.waiting = true;
      setTimeout(() => {
        this.updateProducts();  
        this.waiting = false;
      },100);
      
    }
    else{
      // this.listArray = this.listArray.filter((e: any) => e !== this.value)
      // console.log('hello');
      for(let i=0;i<this.listArray.length;i++){
        if(e.target.value == this.listArray[i]){
          this.listArray.splice(i,1);
        }
      }
      this.waiting = true;
      setTimeout(() => {
        this.updateProducts();  
        this.waiting = false;
      },100);

    }
    this.checked = true;


    console.log(this.listArray);


  }

  updateProducts(){

    if(this.listArray.length == 0){
      this.noProducts = false
      this.filterOn = false;
      let temp = this.productsService.getAll();


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
              if(product.stock !== 0){
                this.shownProducts.push(product);
              }
              
            }
          }
        }


      if(this.shownProducts.length == 0){
        this.noProducts = true;
      }



      console.log(this.shownProducts);


    }
    else{

      this.filterOn = true;


      let temp =  this.products;
      console.log(temp);



      this.shownProducts = [];

      let i = 0;



        for(let subcat of this.listArray){

          for(let product of temp){
            if(product.subcategory == subcat){
              this.shownProducts.push(product)
              console.log('yoyo!!!');

            }
          }

        }
      console.log(this.shownProducts);
      if(this.shownProducts.length > 0){
        this.noProducts = false;
        this.page = 1;
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

  handleProductsPerPage(){
    this.showSortOptions = false;
    if(this.showProductsPerPage){
      this.showProductsPerPage = false;
    }
    else{
      this.showProductsPerPage = true;
    }
  }

  handleSortOptions(){
    this.showProductsPerPage = false;
    if(this.showSortOptions){
      this.showSortOptions = false;
    }
    else{
      this.showSortOptions = true;
    }
  }

  handleSearch(){
    this.showProductsPerPage = false;
    this.showSortOptions = false;
  }

  handlePageChange(event: any){
    console.log("Hello");
    
    this.waiting = true;
    setTimeout(() =>{
      this.page = event;
      this.waiting = false;
    },200)
  }

  ngOnDestroy(): void {
    console.log("hello");

    this.listArray = [];

    this.shownProducts = [];
  }

}
