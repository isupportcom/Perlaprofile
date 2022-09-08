import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { product } from 'src/app/AdminArea/adminareaproducts/adminareaproducts.component';
import {ProductsService} from "../products.service";
import axios from "axios";
import { Category } from '../categories.model';
import {NgForm} from "@angular/forms";
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
  search:string = "";
  message:string ='';
  @ViewChild('menu1') menu1!: ElementRef;
  @ViewChild('menu2') menu2!: ElementRef;





  constructor(private router: Router,private productsService: ProductsService,private route: ActivatedRoute,private renderer: Renderer2) {

    this.renderer.listen('window', 'click',(e:Event)=>{



      if(e.target !== this.menu1.nativeElement && e.target !== this.menu2.nativeElement){




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
  logoSource2?: string;
  waiting: boolean = false;
  fits: boolean = true;
  itemsPP: number = 9;
  relatedProducts = [1,2,3,4];
  showList: boolean = false;
  logoList: {
    source: string,
    id: number,
    name: string
  } | any= [];
  categoryToGo: any;
  showBigFilters: boolean = true;

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

    if(this.innerWidth<=768){
      this.showBigFilters = false;
    }
    else{
      this.showBigFilters = true;
    }

    if(this.innerWidth <1400){
      this.relatedProducts = [1,2,3];
    }
    if(this.innerWidth < 992){
      this.relatedProducts = [1,2];
    }
    if(this.innerWidth < 576){
      this.relatedProducts = [1];
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


    if(this.innerWidth<=768){
      this.showBigFilters = false;
    }
    else{
      this.showBigFilters = true;
    }

    if(this.innerWidth <1400){
      this.relatedProducts = [1,2,3];
    }
    if(this.innerWidth < 992){
      this.relatedProducts = [1,2];
    }
    if(this.innerWidth < 576){
      this.relatedProducts = [1];
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

      this.productsService.setMainCategory(this.mainCategory);

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
      this.logoList = [];

      this.logoSource = '../../../assets/control-logo-white-with-green.svg';
      this.logoSource2 = '../../../assets/control-logo-dark3.svg';

      this.logoList.push({source: '../../../assets/motion-logo-white-with-green.svg',id:115,name:'Motion'})
      this.logoList.push({source: '../../../assets/mosqui-logo-white-with-green.svg',id:116,name:'Mosqui'})
      this.logoList.push({source: '../../../assets/profile-logo-white-with-green.svg',id:117,name:'Profile'})
    }
    else if(this.mainCategory.id === 115){
      this.logoList = [];

      this.logoSource = '../../../assets/motion-logo-white-with-green.svg';
      this.logoSource2 = '../../../assets/motion-logo-dark2.svg';

      this.logoList.push({source: '../../../assets/control-logo-white-with-green.svg',id:114,name:'Control'})
      this.logoList.push({source: '../../../assets/mosqui-logo-white-with-green.svg',id:116,name:'Mosqui'})
      this.logoList.push({source: '../../../assets/profile-logo-white-with-green.svg',id:117,name:'Profile'})
    }
    else if(this.mainCategory.id === 116){
      this.logoList = [];

      this.logoSource = '../../../assets/mosqui-logo-white-with-green.svg';
      this.logoSource2 = '../../../assets/mosqui-logo-dark2.svg';




      this.logoList.push({source: '../../../assets/control-logo-white-with-green.svg',id:114,name:'Control'})
      this.logoList.push({source: '../../../assets/motion-logo-white-with-green.svg',id:115,name:'Motion'})
      this.logoList.push({source: '../../../assets/profile-logo-white-with-green.svg',id:117,name:'Profile'})
    }

    else if(this.mainCategory.id === 117){
      this.logoList = [];

      this.logoSource = '../../../assets/profile-logo-white-with-green.svg';
      this.logoSource2 = '../../../assets/profile-logo-dark2.svg';

      this.logoList.push({source: '../../../assets/control-logo-white-with-green.svg',id:114,name:'Control'})
      this.logoList.push({source: '../../../assets/motion-logo-white-with-green.svg',id:115,name:'Motion'})
      this.logoList.push({source: '../../../assets/mosqui-logo-white-with-green.svg',id:116,name:'Mosqui'})
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

  counter(index: number){

    for(let i=0;i<index;i++){
      this.relatedProducts.push(this.shownProducts[i]);
    }


  }

  handleChangeCategory(id: any,name: any){
    this.router.navigate(['products', id,name]);
    setTimeout(()=> {
      window.location.reload();
    },50);
  }

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

  hanldeCategoriesList(background: any,arrow:any){

    if(!this.showList){
      this.renderer.setStyle(arrow, 'transform', 'rotate(90deg)');
      this.showList = !this.showList;
    }
    else{
      this.renderer.setStyle(arrow, 'transform', 'rotate(0deg)');
      this.showList = !this.showList;
    }

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
  findProducts(){
    console.log("mpike gia res")
    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/search.php",{
      search:this.search,
    }).then(resData=>{
      this.waiting = true;
      console.log(resData.data.products)
      if(resData.data.products.length !=0){
        setTimeout(()=>{
          this.waiting = false;
          this.shownProducts = resData.data.products
          this.message = ""
        },100)


      }else{
          setTimeout(()=>{

            this.waiting =false
            this.shownProducts=[];
          },100)

      }

    })

  }
  ngOnDestroy(): void {
    console.log("hello");

    this.listArray = [];

    this.shownProducts = [];
  }

}
