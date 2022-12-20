import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { product } from 'src/app/AdminArea/adminareaproducts/adminareaproducts.component';

import { ProductsService } from '../products.service';
import axios from 'axios';
// import { Category } from '../categories.model';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationControlsComponent } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { async } from '@angular/core/testing';

interface mainCat {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy , AfterViewInit{
  notEmpty: boolean = false;
  search: string = '';
  message: string = '';
  loadedUser: any;
  showProduct: boolean | any;
  profForm: FormGroup | any;
  @ViewChild('menu1') menu1: ElementRef | any;
  @ViewChild('menu2') menu2: ElementRef | any;
  @ViewChild('menu3') menu3: ElementRef | any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private elem: ElementRef,
    private http: HttpClient,
    private translate: TranslateConfigService
  ) {
    // this.renderer.listen('window', 'click',(e:Event)=>{
    //   if(e.target !== this.menu1.nativeElement && e.target !== this.menu2.nativeElement && e.target !== this.menu3.nativeElement){
    //     this.showProductsPerPage = false;
    //     this.showSortOptions = false;
    //   }
    // })
  }
  loggedIn: boolean = localStorage.getItem('username') ? true : false;
  products: product | any = [];
  totalLength: number | undefined;
  keepPagination = localStorage.getItem('keepPagination');
  tempPage = localStorage.getItem('page')
  paginationCat = localStorage.getItem('paginationCat');
  page: number = 1;

  categories: any = [];
  mainCategory: mainCat = {
    id: 0,
    name: '',
  };
  subcategories: any = [];
  cat_id?: number;
  subcat_id?: number;
  shownProducts: product | any = [];
  filterOn?: boolean;
  noProducts?: boolean;
  listArray: any;
  checked?: boolean;
  contactForm: FormGroup | any;
  fabric: FormGroup | any;
  colors: FormGroup | any;
  showProductsPerPage: boolean = false;
  showSortOptions: boolean = false;
  logoSource?: string;
  logoSource2?: string;
  waiting: boolean = false;
  fits: boolean = true;
  itemsPP: number = 10;
  relatedProducts = [1, 2, 3, 4];
  showList: boolean = false;
  logoList:
    | {
        source: string;
        id: number;
        name: string;
      }
    | any = [];
  categoryToGo: any;
  favoriteTemp: any = [];
  showBigFilters: boolean = true;
  showFilters: boolean = false;
  extend: boolean = false;
  currentLang: any;
  filters: any = document.getElementsByClassName('filter');
  filters2: any = document.getElementsByClassName('boxes');
  filterList: any;
  showExtraFilters: boolean = false;
  fit: boolean = true;
  favorites: any;
  innerWidth!: number;
  executed: boolean = false;
  searched: boolean = false;
  selected_subcategory_id!: number;
  selected_subcategory: any;
  subCategoriesExtraArray: any;
  @ViewChild('checkboxes') checkboxes!: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 768 && this.innerWidth <= 992) {
      this.showExtraFilters = false;
    } else {
      this.showExtraFilters = true;
    }

    if (this.innerWidth <= 445) {
      this.fit = false;
    } else {
      this.fit = true;
    }

    if (this.innerWidth <= 992) {
      this.itemsPP = 4;
    } else {
      this.showFilters = false;
      this.itemsPP = 10;
    }

    if (this.innerWidth <= 1200) {
      this.fits = false;
    } else {
      this.fits = true;
    }

    if (this.innerWidth <= 768) {
      this.showBigFilters = false;
    } else {


      this.showBigFilters = true;

    }

    if (this.innerWidth < 1400) {
      this.relatedProducts = [1, 2, 3];
    }
    if (this.innerWidth < 992) {
      this.relatedProducts = [1, 2];
    }
    if (this.innerWidth < 576) {
      this.relatedProducts = [1];
    }
  }

  ngAfterViewInit(): void {




  }

  ngOnInit(){



    this.currentLang = localStorage.getItem('lang') || 'el'



    this.waiting = true;
    setTimeout(() => {
      this.waiting = false;
    },800)



    axios.post('https://perlaNodeRest.vinoitalia.gr/products/getAllMosquiCat').then(resData => {
      console.log(resData.data.subcategories);
      this.subCategoriesExtraArray = resData.data.subcategories;
    })

    this.contactForm = this.fb.group({
      width: [null],
      height: [null],
    });
    this.fabric = this.fb.group({
      fabricname: [null],
    });
    this.colors = this.fb.group({
      color: [null],
    });
    console.log();

    this.loadedUser = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log(this.loadedUser);

    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 992) {
      this.itemsPP = 4;
    } else {
      this.itemsPP = 10;
    }

    if (this.innerWidth <= 1200) {
      this.fits = false;
    } else {
      this.fits = true;
    }

    if (this.innerWidth <= 445) {
      this.fit = false;
    } else {
      this.fit = true;
    }

    if (this.innerWidth >= 768 && this.innerWidth <= 992) {
      this.showExtraFilters = false;
    } else {
      this.showExtraFilters = true;
    }

    if (this.innerWidth <= 768) {
      this.showBigFilters = false;
    } else {

      this.showBigFilters = true;
    }




      let checkboxes = document.getElementById('checkboxList')
      console.log(checkboxes);

      console.log();
      this.route.params.subscribe((params) => {

        console.log(+this.router.url.split('/')[2]);
        this.selected_subcategory_id = +this.router.url.split('/')[4];


        console.log(+params['cat_id']);
        console.log(params['cat_name']);
        // console.log(params['subcat_id']);
        // console.log(params['subcat_name']);


        this.mainCategory.id = +params['cat_id'];
        if (this.mainCategory.id === 114) {
          this.logoSource = '../../../assets/control-logo-white-with-green.svg';
        } 
        else if (this.mainCategory.id === 115) {
          this.logoSource = '../../../assets/motion-logo-white-with-green.svg';
        } 
        else if (this.mainCategory.id === 116) {
          this.logoSource = '../../../assets/mosqui-logo-white-with-green.svg';
        } 
        else if (this.mainCategory.id === 117) {
          this.logoSource = '../../../assets/profile-logo-white-with-green.svg';
        }
        else if (this.mainCategory.id === 118){
          this.logoSource = '../../../assets/accessiries logo white.svg'
        }
        this.productsService
          .getAllCategories(this.mainCategory.id)
          .subscribe((resData: any) => {
            console.log(resData);
            this.productsService.setAllCategoriesArray(
              resData.categories[0].subcategories
            );
            this.categories = resData.categories[0].subcategories;

            this.listArray = [];
            console.log(this.showFilters);
            
            if(this.showBigFilters){
              this.updateFilters(true);
            }
            else{
              this.updateFilters(false,true);
            }


            console.log(this.categories.length);


          });


        console.log(this.listArray);

        this.mainCategory.name = params['cat_name'];


        this.productsService.setMainCategory(this.mainCategory);

        localStorage.setItem(
          'currentCategory',
          JSON.stringify(this.mainCategory)
        );
      });







    console.log(this.categories);

    this.productsService.getMainCategories().subscribe((resData) => {
      this.productsService.setMainCategoriesArray(resData);
    });

    if (this.mainCategory.id === 114) {
      this.logoList = [];

      this.logoSource = '../../../assets/control-logo-white-with-green.svg';
      this.logoSource2 = '../../../assets/control-logo-dark3.svg';

      this.logoList.push({
        source: '../../../assets/motion-logo-white-with-green.svg',
        id: 115,
        name: 'Motion',
      });
      this.logoList.push({
        source: '../../../assets/mosqui-logo-white-with-green.svg',
        id: 116,
        name: 'Mosqui',
      });
      this.logoList.push({
        source: '../../../assets/profile-logo-white-with-green.svg',
        id: 117,
        name: 'Profile',
      });

    } else if (this.mainCategory.id === 115) {
      this.logoList = [];

      this.logoSource = '../../../assets/motion-logo-white-with-green.svg';
      this.logoSource2 = '../../../assets/motion-logo-dark2.svg';

      this.logoList.push({
        source: '../../../assets/control-logo-white-with-green.svg',
        id: 114,
        name: 'Control',
      });
      this.logoList.push({
        source: '../../../assets/mosqui-logo-white-with-green.svg',
        id: 116,
        name: 'Mosqui',
      });
      this.logoList.push({
        source: '../../../assets/profile-logo-white-with-green.svg',
        id: 117,
        name: 'Profile',
      });
    } else if (this.mainCategory.id === 116) {
      this.logoList = [];

      this.logoSource = '../../../assets/mosqui-logo-white-with-green.svg';
      this.logoSource2 = '../../../assets/mosqui-logo-dark2.svg';

      this.logoList.push({
        source: '../../../assets/control-logo-white-with-green.svg',
        id: 114,
        name: 'Control',
      });
      this.logoList.push({
        source: '../../../assets/motion-logo-white-with-green.svg',
        id: 115,
        name: 'Motion',
      });
      this.logoList.push({
        source: '../../../assets/profile-logo-white-with-green.svg',
        id: 117,
        name: 'Profile',
      });
    } else if (this.mainCategory.id === 117) {
      this.logoList = [];

      this.logoSource = '../../../assets/profile-logo-white-with-green.svg';
      this.logoSource2 = '../../../assets/profile-logo-dark2.svg';

      this.logoList.push({
        source: '../../../assets/control-logo-white-with-green.svg',
        id: 114,
        name: 'Control',
      });
      this.logoList.push({
        source: '../../../assets/motion-logo-white-with-green.svg',
        id: 115,
        name: 'Motion',
      });
      this.logoList.push({
        source: '../../../assets/mosqui-logo-white-with-green.svg',
        id: 116,
        name: 'Mosqui',
      });
    }
    else if (this.mainCategory.id === 118){
      this.logoSource = '../../../assets/accessiries logo white.svg'
    }

    axios.post('https://perlaNodeRest.vinoitalia.gr/products/offersByCategory', {
      category_id: this.mainCategory.id
    }).then(resData => {
      console.log(resData.data);
      if(resData.data.products){
        if(resData.data.products.length > 0){
          this.notEmpty = true;
        }
        else{
          this.notEmpty = false;
        }
      }
      else{
        this.notEmpty = false;
      }


    })


  }
  selectedCategory: boolean | any;
  selectedHeight: boolean | any;
  selectedWidth: boolean | any;
  shouldContinue: boolean | any;
  check() {
    if (this.listArray.length == 0) {
      this.selectedCategory = false;
    } else {
      this.selectedCategory = true;
    }
    if (this.contactForm.value.height == null) {
      this.selectedHeight = false;
    } else {
      this.selectedHeight = true;
    }
    if (this.contactForm.value.width == null) {
      this.selectedWidth = false;
    } else {
      this.selectedWidth = true;
    }

    if (
      this.selectedCategory == true &&
      this.selectedHeight == true &&
      this.selectedWidth == true
    ) {
      this.shouldContinue = true;
    }
  }

  findProduct(btn: any){
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => {
        btn.classList.remove('loading')
    }, 2700);
      }
  }

  updateFilters(first_time: boolean,smallFilters?: boolean){
    this.page = 1;
    if(!smallFilters){
      if(first_time){
        setTimeout(() => {
          if(this.mainCategory.id != 116 && this.mainCategory.id != 117){
  
            if(!this.showBigFilters && this.listArray.length == 0){
              console.log("TRELAA");
              this.listArray.push(this.categories[0].sub_id)
              this.updateProducts(this.categories[0].sub_id);
              this.selected_subcategory_id = this.categories[0].sub_id;
            }
            else{
              for(let i=0;i<this.categories.length;i++){
                console.log("HEY");
  
                let id = 'check'+i+this.mainCategory.id;
                console.log(id);
                let check = document.getElementById(id)
                console.log(check);
  
                // console.log(this.categories[0].sub_id);
  
                console.log(check);
  
                if(+(<HTMLInputElement>check).value == this.selected_subcategory_id){
                  console.log("HEYYY");
                  if(this.listArray){
                    // if(this.listArray.length == 0){
  
                      (<HTMLInputElement>check).checked = true;
                      this.listArray.push(this.selected_subcategory_id)
                      this.updateProducts(this.selected_subcategory_id);
                    // }
                  }
                  // else{
                  //   (<HTMLInputElement>check).checked = true;
                  //     this.listArray.push(this.selected_subcategory_id)
                  //     this.updateProducts();
  
                  // }
                  // break;
                }
              }
            }
            console.log(this.listArray);
  
          }
        },500)
      }
      else{
          if(this.mainCategory.id != 116 && this.mainCategory.id != 117){
  
            if(!this.showBigFilters && this.listArray.length == 0){
              
                console.log("TRELAA");
                this.listArray.push(this.categories[0].sub_id)
                this.updateProducts(this.categories[0].sub_id);
                this.selected_subcategory_id = this.categories[0].sub_id;
              
            }
            else{
              for(let i=0;i<this.categories.length;i++){
                console.log("HEY");
  
                let id = 'check'+i+this.mainCategory.id;
                console.log(id);
                let check = document.getElementById(id)
                // console.log(check);
  
                // console.log(this.categories[0].sub_id);
  
                // console.log(check);
  
                if(+(<HTMLInputElement>check).value == this.selected_subcategory_id){
                  console.log("HEYYY");
                  if(this.listArray){
                    // if(this.listArray.length == 0){
  
                      (<HTMLInputElement>check).checked = true;
                      this.listArray.push(this.selected_subcategory_id)
                      this.updateProducts(this.selected_subcategory_id);
                    // }
                  }
                  // else{
                  //   (<HTMLInputElement>check).checked = true;
                  //     this.listArray.push(this.selected_subcategory_id)
                  //     this.updateProducts();
  
                  // }
                  // break;
                }
              }
            }
            console.log(this.listArray);
  
          }
      }
    }
    else{
    //Mikra Filtra
    if(this.mainCategory.id != 116 && this.mainCategory.id != 117){
      if(!this.showFilters){
        this.listArray.push(this.selected_subcategory_id);
        this.updateProducts(this.selected_subcategory_id);
      }
      else{
        
        
        this.handleShowFilters(false);
        this.listArray.push(this.selected_subcategory_id);
        this.updateProducts(this.selected_subcategory_id);

      }
      
      console.log(this.listArray);

    }
    }



  }



  shouldContinueColors: boolean | any;
  checkColor() {
    console.log(this.colors.value.color != undefined);
    this.showProduct = true;
    if (this.colors.value.color != undefined) {
      this.showProduct = true;
      this.waiting = false;
    } else {
      this.showProduct = false;
    }
    console.log(this.showProduct);
  }
  checkFabric() {
    if (this.fabric.value.fabricname != undefined) {
      this.shouldContinueColors = true;
    } else {
      this.shouldContinueColors = false;
    }
  }
  counter(index: number) {
    for (let i = 0; i < index; i++) {
      this.relatedProducts.push(this.shownProducts[i]);
    }
  }

  handleChangeCategory(id: any, name: any) {
    this.router.navigate(['products', id, name]);
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }

  handleCheckboxes2(e: any) {
    console.log(
      e.target.parentElement.parentElement.children[0].children[0].children[0]
    );

    e =
      e.target.parentElement.parentElement.children[0].children[0].children[0];

    this.handleCheckboxes(e, true);
  }

  yoyo(e: any){
    console.log(e);

    this.handleCheckboxes(e,false)

  }

  handleWizzardProfile(name: string, id: number) {
    this.productsService.setSingleProduct({
      name: name,
      id: id,
      category: 117,
    });
    this.router.navigate(['products/product-page']);

    // this.router.navigate(['products/mosqui',id,name]);
  }

  handleCheckboxes(e: any, clickeP?: boolean) {
      this.shownProducts = [];
      // console.log(e.value);
      console.log(this.categories);
      console.log(this.mainCategory);
  
      let boxes;
      boxes = e.parentElement.parentElement.parentElement.parentElement.parentElement.children;
  
      this.listArray = [];
  
      console.log(boxes);
      for(let i=0; i<boxes.length;i++){
        console.log(boxes[i].children[0].children[0].children[0].children[0].checked);
        if(boxes[i].children[0].children[0].children[0].children[0].checked){
          console.log("OUAOU");
          console.log(e.value);
          console.log(boxes[i].children[0].children[0].children[0].children[0].value);
  
          boxes[i].children[0].children[0].children[0].children[0].checked = false;
        }
      }
      
  
      let subcategory_selected: any;
  
      this.categories.forEach((category: any) => {
        if(category.sub_id == +e.value){
          subcategory_selected = category;
          this.selected_subcategory = category;
          this.selected_subcategory_id = subcategory_selected.sub_id;
        }
      });
      console.log('products'+'/'+this.mainCategory.id+'/'+this.mainCategory.name+'/'+subcategory_selected.sub_id+'/'+subcategory_selected.name);
      let url = 'products'+'/'+this.mainCategory.id+'/'+this.mainCategory.name+'/'+subcategory_selected.sub_id+'/'+subcategory_selected.name;
      if(subcategory_selected){
        if(this.showBigFilters){
          this.updateFilters(false);
        }
        else{
          e.checked = true;
          this.updateFilters(false,true);
        }
        this.router.navigate(['products',this.mainCategory.id,this.mainCategory.name,subcategory_selected.sub_id,subcategory_selected.name]);
      }

  }

  hanldeCategoriesList(background: any, arrow: any) {
    if (!this.showList) {
      this.renderer.setStyle(arrow, 'transform', 'rotate(90deg)');
      this.showList = !this.showList;
    } else {
      this.renderer.setStyle(arrow, 'transform', 'rotate(0deg)');
      this.showList = !this.showList;
    }
  }

  updateProducts(sub_id: any) {
    this.waiting = true;
    axios.get('https://perlanoderest.vinoitalia.gr/products/getProducts',
    {
      params:{
        sub_cat_id: sub_id
      }
    }).then(resData => {
      this.waiting = false;
      setTimeout(async() => {
        console.log(resData.data.products);

        this.shownProducts = resData.data.products;


        if(this.shownProducts.length == 0){
          this.noProducts = true;
        }
        else{
          if(this.loggedIn){
            for(let i=0;i<this.shownProducts.length;i++){
             let req=await axios.post('https://perlaNodeRest.vinoitalia.gr/products/isFavorite',
              {
                mtrl: this.shownProducts[i].mtrl,
                trdr: this.loadedUser.trdr
              })

                console.log(req.data.exists);

                if(req.data.exists){
                  this.shownProducts[i].addedToFav = true;
                }
                else{
                  this.shownProducts[i].addedToFav = false;
                }

            }
          }

          this.noProducts = false;
        }
      },200)
    })




    setTimeout(() => {

      if (this.listArray.length == 0) {
        this.noProducts = false;
        this.filterOn = false;
        let temp: any = this.products;
        console.log(temp);

        for (let product of temp) {
          let flag2 = true;
          if(this.favorites){
            for (let favProd of this.favorites) {
              if (product.mtrl == favProd.mtrl) {
                console.log('Mphka');

                product.addedToFav = true;
                flag2 = false;
              }
            }
            if (flag2) {
              product.addedToFav = false;
            }

          }
        }
      }
    })

  }

  handleRefreshFilters(){
    console.log("HOORAY");
    
    let smallFilters: any = document.getElementsByClassName('smallFilter')
    // console.log(this.filters);
    // console.log(smallFilters);
    
    for(let i=0;i<smallFilters.length;i++){
      if(smallFilters[i].value == this.selected_subcategory_id){
        smallFilters[i].checked = true;
      }
    }
  }

  handleShowFilters(refresh: boolean) {
    
    
    
    if (this.showFilters && !refresh) {
      this.showFilters = false;
      this.extend = false;
    }
    else {
      this.showFilters = true;
      this.extend = false;
      setTimeout(() => {
        this.extend = true;
        let smallFilters: any = document.getElementsByClassName('smallFilter')
        // console.log(this.filters);
        // console.log(smallFilters);
        
        for(let i=0;i<smallFilters.length;i++){
          if(smallFilters[i].value == this.selected_subcategory_id){
            smallFilters[i].checked = true;
            
          }
        }

        // for(let i=0; i<this.filters2.length; i++){
        //   for(let id of this.listArray){
        //     if(id === smallFilters[i].value){
        //       smallFilters[i].checked = true;

        //     }
        //   }
        // }

        // for(let i=0; i<this.filters2.length; i++){
        //   this.filters[i] = smallFilters[i].checked
        // }
      },50);
    }
  }



  getSubcategories() {
    let i = 0;
    for (let category of this.categories) {
      if (category.id == this.mainCategory.id) {
        this.subcategories[i++] = category;
      }
    }
    return this.subcategories;
  }

  handleFilter(mainCategory: any, subcategory: any) {
    this.filterOn = true;
    this.router.navigate(['products', mainCategory.id, subcategory.sub_id]);
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }

  handleProductsPerPage() {
    this.showSortOptions = false;
    if (this.showProductsPerPage) {
      this.showProductsPerPage = false;
    } else {
      this.showProductsPerPage = true;
    }
  }

  handleSortOptions() {
    this.showProductsPerPage = false;
    if (this.showSortOptions) {
      this.showSortOptions = false;
    } else {
      this.showSortOptions = true;
    }
  }

  handleSearch() {
    this.showProductsPerPage = false;
    this.showSortOptions = false;
  }

  handlePageChange(event: any) {



    this.waiting = true;
    setTimeout(() => {
      this.page = event;
      this.waiting = false;
    }, 200);
  }

  handleAscend(event: any){
    if(event.target.value == 1){
      let temp;
      for(let i=0;i<this.shownProducts.length-1;i++){
        console.log('Hey: ' + this.shownProducts.length);

        for(let y=0;y<this.shownProducts.length-1-i;y++){
          if(this.shownProducts[y].hasOffer){
            if(this.shownProducts[y+1].hasOffer){
              if(+this.shownProducts[y].offer > +this.shownProducts[y+1].offer){
                temp = this.shownProducts[y];
                this.shownProducts[y] = this.shownProducts[y+1];
                this.shownProducts[y+1] = temp;

              }
            }
            else{
              if(+this.shownProducts[y].offer > +this.shownProducts[y+1].wholesale){

                temp = this.shownProducts[y];
                this.shownProducts[y] = this.shownProducts[y+1];
                this.shownProducts[y+1] = temp;
              }
            }
          }
          else{
            if(this.shownProducts[y+1].hasOffer){
              if(+this.shownProducts[y].wholesale > +this.shownProducts[y+1].offer){

                temp = this.shownProducts[y];
                this.shownProducts[y] = this.shownProducts[y+1];
                this.shownProducts[y+1] = temp;
              }
            }
            else{
              if(+this.shownProducts[y].wholesale > +this.shownProducts[y+1].wholesale){

                temp = this.shownProducts[y];
                this.shownProducts[y] = this.shownProducts[y+1];
                this.shownProducts[y+1] = temp;
              }
            }
          }
        }
      }

      console.log(this.shownProducts);
    }

    if(event.target.value == 2){
      let temp;
      for(let i=0;i<this.shownProducts.length-1;i++){
        console.log('Hey: ' + this.shownProducts.length);

        for(let y=0;y<this.shownProducts.length-1-i;y++){
          if(this.shownProducts[y].hasOffer){
            if(this.shownProducts[y+1].hasOffer){
              if(+this.shownProducts[y].offer < +this.shownProducts[y+1].offer){
                temp = this.shownProducts[y];
                this.shownProducts[y] = this.shownProducts[y+1];
                this.shownProducts[y+1] = temp;

              }
            }
            else{
              if(+this.shownProducts[y].offer < +this.shownProducts[y+1].wholesale){

                temp = this.shownProducts[y];
                this.shownProducts[y] = this.shownProducts[y+1];
                this.shownProducts[y+1] = temp;
              }
            }
          }
          else{
            if(this.shownProducts[y+1].hasOffer){
              if(+this.shownProducts[y].wholesale < +this.shownProducts[y+1].offer){

                temp = this.shownProducts[y];
                this.shownProducts[y] = this.shownProducts[y+1];
                this.shownProducts[y+1] = temp;
              }
            }
            else{
              if(+this.shownProducts[y].wholesale < +this.shownProducts[y+1].wholesale){

                temp = this.shownProducts[y];
                this.shownProducts[y] = this.shownProducts[y+1];
                this.shownProducts[y+1] = temp;
              }
            }
          }
        }
      }

      console.log(this.shownProducts);
    }

  }

  // findProducts(){

  // }

  findProducts() {
    this.shownProducts = [];
    this.searched = true;
    this.waiting = true;
    this.filterOn = false;
    console.log(this.search);
    if(this.search === ""){
      axios
      .post('https://perlanoderest.vinoitalia.gr/products/search', {
        search: '100',

      })
      .then((resData) => {

        console.log(resData.data);

          setTimeout(() => {
            this.waiting = false;
            this.updateProducts(this.selected_subcategory_id);
          }, 100);
      });
    }
    else{
      this.filterOn = true;
      axios
      .post('https://perlanoderest.vinoitalia.gr/products/search', {
        search: this.search,
      })
      .then((resData) => {
        console.log(resData.data);
        if (resData.data.products.length != 0) {
          setTimeout(async() => {
            this.waiting = false;
            this.shownProducts = resData.data.products;
            this.noProducts = false;
            this.message = '';
            if(this.loggedIn){

              for(let i=0;i<this.shownProducts.length;i++){
                let req = await  axios.post('https://perlaNodeRest.vinoitalia.gr/products/isFavorite',
                {
                  mtrl: this.shownProducts[i].mtrl,
                  trdr: this.loadedUser.trdr
                })

                  console.log(req.data.exists);

                  if(req.data.exists){
                    this.shownProducts[i].addedToFav = true;
                  }
                  else{
                    this.shownProducts[i].addedToFav = false;
                  }

              }
            }

          }, 100);
        } else {
          setTimeout(() => {
            this.waiting = false;
            this.message = 'no product found'
            this.shownProducts = [];
            console.log(this.message);
            this.noProducts = true;
          }, 100);
        }
      });
    }

  }
  handleWizzard(name: string, id: number) {

    localStorage.setItem("mtrl",JSON.stringify(
    {
      name: name,
      id: id,
      category: 116,
      mtrl: null
    }));
    this.router.navigate(['products',this.mainCategory.id,this.mainCategory.name,id,name]);

  }
  ngOnDestroy(): void {
    this.shownProducts = [];
    this.products = [];
    this.categories = [];

  }
}
