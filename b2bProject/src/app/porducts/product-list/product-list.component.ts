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

    axios.post('https://perlarest.vinoitalia.gr/php-auth-api/offersByCategory.php', {
      category_id: this.mainCategory.id
    }).then(resData => {
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

    this.currentLang = localStorage.getItem('lang') || 'el'



    this.waiting = true;
    setTimeout(() => {
      this.waiting = false;
    },800)





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


    console.log("HAIA");

    // https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php

    axios
      .get('https://perlanoderest.vinoitalia.gr/products/getProducts')
      .then(async (resData: any) => {
        console.log(resData.data);
        // console.log(resData.data)
        console.log(resData.data);
        for (let i = 0; i < resData.data.products.length; i++) {
          this.products[i] = {
            mtrl: resData.data.products[i].mtrl,
            name: resData.data.products[i].name,
            name1: resData.data.products[i].name1,
            code: resData.data.products[i].code,
            retail: resData.data.products[i].retailPrice,
            wholesale: resData.data.products[i].wholesalePrice,
            qty: 1,
            offer: resData.data.products[i].offer,
            discount: resData.data.products[i].discount,
            hasOffer: resData.data.products[i].hasOffer,
            stock: resData.data.products[i].stock,
            category: resData.data.products[i].category,
            subcategory: resData.data.products[i].subcategory,
            img: resData.data.products[i].image,
            otherImages: resData.data.products[i].otherImages,
            description: resData.data.products[i].description,
            description_eng: resData.data.products[i].description_eng,
            data_sheet: resData.data.products[i].data_sheet,
            pdf: resData.data.products[i].pdf,
            video: resData.data.products[i].video,
            product_name: resData.data.products[i].onoma,
            product_name_eng: resData.data.products[i].onoma_eng,
            kodikos_kataskeuasti: resData.data.products[i].kodikos_kataskeuasti,
            texnikos_kodikos: resData.data.products[i].texnikos_kodikos,
            diathesima: resData.data.products[i].diathesima,
            omada: resData.data.products[i].omada
          };
          this.productsService.setAll(this.products[i]);
        }






        setTimeout(() => {




          if(this.favorites){
            for (let favorite of this.favorites) {
              for (let prod of this.products) {
                if (prod.mtrl === favorite.mtrl) {
                  prod.addedToFav = true;
                }
              }
              for (let prod of this.products) {
                if (!prod.addedToFav) {
                  prod.addedToFav = false;
                }
              }
          }
          }
        }, 200);

        this.totalLength = this.products.length;

        this.listArray = [];




        this.productsService.prevfilters.subscribe(resData => {
          console.log("EIMMAI MESA");
          console.log(resData);

          this.listArray = [];
          if(resData != null){
            this.filterList = Object.values(resData )

            for(let filter of this.filterList){
              this.listArray.push(filter);
            }

            if(!this.showBigFilters){
              this.updateProducts()
            }
            else{
              setTimeout(() => {
                console.log(this.filters);

                for(let i=0; i<this.filters.length; i++){
                  for(let id of this.listArray){
                    if(id === this.filters[i].value){
                      this.filters[i].checked = true;
                      this.updateProducts();
                      // this.handleCheckboxes(this.filters[i]);
                    }
                  }
                }


                this.executed = true;
              },300)
            }
          }




        })




        // setTimeout(() => {

        //   for(let filter of this.filters){
        //     if(filter.checked){
        //       this.handleCheckboxes(filter)
        //     }
        //   }

        //   for(let filter of this.filters2){
        //     if(filter.checked){


        //       this.handleCheckboxes(filter)
        //     }

        //   }
        // },300)



      });



      let checkboxes = document.getElementById('checkboxList')
      console.log(checkboxes);

      console.log();
      this.route.params.subscribe((params) => {
        console.log(params);

        console.log(+params['cat_id']);
        console.log(params['cat_name']);

        this.mainCategory.id = +params['cat_id'];
        this.productsService
          .getAllCategories(this.mainCategory.id)
          .subscribe((resData: any) => {
            console.log(resData);
            this.productsService.setAllCategoriesArray(
              resData.Categories[0].subcategoris
            );
            this.categories = this.productsService.getCategoriesArray();
            console.log(this.listArray);

            setTimeout(() => {
              if(this.mainCategory.id != 116 && this.mainCategory.id != 117){

                if(!this.showBigFilters && this.listArray.length == 0){
                  console.log("TRELAA");
                  this.listArray.push(this.categories[0].sub_id)
                  this.updateProducts();
                }
                else{
                  for(let i=0;i<this.categories.length;i++){
                    console.log("HEY");

                    let id = 'check'+i+this.mainCategory.id;
                    console.log(id);
                    let check = document.getElementById(id)
                    console.log(check);

                    console.log(this.categories[0].sub_id);

                    console.log(check);

                    if((<HTMLInputElement>check).value == this.categories[0].sub_id){
                      console.log("HEYYY");
                      if(this.listArray){
                        if(this.listArray.length == 0){

                          (<HTMLInputElement>check).checked = true;
                          // this.handleCheckboxes((<HTMLInputElement>check));
                          this.listArray.push(this.categories[0].sub_id)
                          this.updateProducts();
                          // this.listArray[0] = (<HTMLInputElement>check).value;
                          // this.updateProducts();
                        }
                      }
                      else{
                        (<HTMLInputElement>check).checked = true;
                          // this.handleCheckboxes((<HTMLInputElement>check));
                          this.listArray.push(this.categories[0].sub_id)
                          this.updateProducts();
                          // this.listArray[0] = (<HTMLInputElement>check).value;
                          // this.updateProducts();
                      }
                      break;
                    }
                  }
                }
              }

            },200)
            console.log(this.categories.length);


          });


        console.log(this.listArray);

        this.mainCategory.name = params['cat_name'];






        if ( this.paginationCat){
          if(+this.paginationCat == this.mainCategory.id){
            if(!this.keepPagination){
              this.page = 1;
            }
            else{
              if(this.keepPagination == 'true'){
                if(this.tempPage){
                  this.page = +this.tempPage
                }
                else{
                  this.page = 1;
                }
              }
              else{
                this.page = 1;
              }
            }
          }
          else{
            localStorage.removeItem('paginationCat');
            this.page = 1;
          }
        }
        // page = this.paginationCat? (this.paginationCat == this.mainCategory?)  : 1;
        // (!this.keepPagination? 1 : (this.keepPagination == 'true'? (this.tempPage? +this.tempPage : 1)  : 1))

        this.productsService.setMainCategory(this.mainCategory);

        localStorage.setItem(
          'currentCategory',
          JSON.stringify(this.mainCategory)
        );
      });





    // this.productsService.getAllCategories().subscribe(resData => {
    //   console.log(resData);

    //  this.productsService.setAllCategoriesArray(resData);
    // })

    console.log(this.categories);

    this.productsService.getMainCategories().subscribe((resData) => {
      this.productsService.setMainCategoriesArray(resData);
    });
    // this.mainCategories = this.productsService.getMainCategoriesArray();
    // console.log(this.mainCategories);

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
  }
  // this.productsService.cast.subscribe((res: any) => {
  //   this.product = res;

  // console.log(this.product);
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

  updateFilters(){

  }

  getFavourites() {
    return this.http.get(
      'https://perlanoderest.vinoitalia.gr/products/favorites',
      {
        params:{
          trdr: this.loadedUser.trdr,
          mtrl: 'dontNeedIt',
          mode: 'fetch',
        }

      }
    );
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
    this.router.navigate(['/products/product-page']);

    // this.router.navigate(['products/mosqui',id,name]);
  }

  handleCheckboxes(e: any, clickeP?: boolean) {
    this.shownProducts = [];
    console.log(e);

    let flag = false;
    let boxes;
    boxes = e.parentElement.parentElement.parentElement.parentElement.parentElement.children;


    if(clickeP){
      console.log("P");

      console.log(boxes);
      for(let i=0; i<boxes.length;i++){
        if(boxes[i].children[0].children[0].children[0].children[0].checked){
          if(e.value == boxes[i].children[0].children[0].children[0].children[0].value){
            flag = true;
          }
          boxes[i].children[0].children[0].children[0].children[0].checked = false;
        }
      }
    }
    else{
      console.log("INPUT");

      console.log(boxes);
      for(let i=0; i<boxes.length;i++){
        console.log(boxes[i].children[0].children[0].children[0].children[0].checked);
        if(boxes[i].children[0].children[0].children[0].children[0].checked){
          console.log("OUAOU");
          console.log(e.value);
          console.log(boxes[i].children[0].children[0].children[0].children[0].value);

          if(e.value == boxes[i].children[0].children[0].children[0].children[0].value){
            console.log("YEAHHHHHHH");

            flag = true;
          }
          boxes[i].children[0].children[0].children[0].children[0].checked = false;
        }
      }

      // console.log(e.parentElement.parentElement.parentElement.parentElement.parentElement.children);
      // .children[0].children[0].children[0].children[0]

    }
    this.filterOn = false;
    this.listArray = [];
    console.log(flag);

    if((flag && !clickeP) || (!flag && clickeP)){

      if (clickeP) {
        if (!e.checked) {
          e.checked = true;
        } else {
          e.checked = false;
        }
        if (e.checked) {
          this.listArray.push(e.value);
          this.waiting = true;
          setTimeout(() => {
            this.updateProducts();
            this.waiting = false;

          },600);

        }
        else{

          // this.listArray = this.listArray.filter((e: any) => e !== this.value)
          // console.log('hello');
          for (let i = 0; i < this.listArray.length; i++) {
            if (e.value == this.listArray[i]) {
              this.listArray.splice(i, 1);
            }
          }
          this.waiting = true;
          this.updateProducts();
          setTimeout(() => {
            this.waiting = false;

          },600);


        }
        this.checked = true;

        console.log(this.listArray);
      } else {

        if (!e.checked) {

          e.checked = true;
        } else {
          e.checked = false;
        }
        if (e.checked) {
          this.listArray.push(e.value);
          this.waiting = true;
          console.log(this.listArray);


          this.updateProducts();
          setTimeout(() => {
            this.waiting = false;

          },600);

        }
        else{

          // this.listArray = this.listArray.filter((e: any) => e !== this.value)
          // console.log('hello');
          for (let i = 0; i < this.listArray.length; i++) {
            if (e.value == this.listArray[i]) {
              this.listArray.splice(i, 1);
            }
          }
          this.waiting = true;

          this.updateProducts();
          setTimeout(() => {
            this.waiting = false;

          },600);

        }
        this.checked = true;

        console.log(this.listArray);
      }

      if(e.classList[0] === 'boxes'){
        for(let i=0;i< this.filters.length; i++){
          if(e.value === this.filters[i].value){
            this.filters[i].checked = e.checked;
          }

        }
      }
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

  updateProducts(listArray?: any) {
    let favouritesObs: Observable<any>;

    favouritesObs = this.getFavourites();

    favouritesObs.subscribe((resData) => {
      this.favorites = resData.products;
    });

    console.log(listArray);
    setTimeout(() => {

      if (this.listArray.length == 0) {
        this.noProducts = false;
        this.filterOn = false;
        // console.log(this.productsService.getAll());
        // let temp: any = this.productsService.getAll();
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

          let flag = false;
          if (product.category == this.mainCategory.id) {
            for (let el of this.shownProducts) {
              if (product.mtrl == el.mtrl) {

                flag = true;
              }
            }

            if (!flag) {
              if (product.stock !== 0) {
                console.log(product.stock);
                this.shownProducts.push(product);
              }
            }
        }
        }

        if (this.shownProducts.length == 0) {
          this.noProducts = true;
        }

        console.log(this.shownProducts);
      } else {

        this.filterOn = true;

        let temp = this.products;
        console.log(temp);

        this.shownProducts = [];

        let i = 0;

        for (let subcat of this.listArray) {
          for (let product of temp) {
            if (product.subcategory == subcat) {
              this.shownProducts.push(product);
              console.log('yoyo!!!');
            }
          }
        }
        console.log(this.shownProducts);
        if (this.shownProducts.length > 0) {
          this.noProducts = false;
          this.page = 1;
        } else {
          this.noProducts = true;
        }
      }

    }, 300);
    if(this.executed){
      this.executed = false;
    }
  }

  handleShowFilters() {


    if (this.showFilters) {
      this.showFilters = false;
      this.extend = false;
    }
    else {
      this.showFilters = true;
      this.extend = false;
      setTimeout(() => {
        this.extend = true;

        // console.log(this.filters);
        for(let i=0; i<this.filters2.length; i++){
          for(let id of this.listArray){
            if(id === this.filters2[i].value){
              this.filters2[i].checked = true;

              // this.handleCheckboxes(this.filters[i]);
            }
          }
        }

        for(let i=0; i<this.filters2.length; i++){
          this.filters[i] = this.filters2[i].checked
        }
      },50);
    }
  }

  handleClearFilters() {
    this.filterOn = false;
    this.listArray = [];
    this.shownProducts = [];
    this.search = '';
    this.searched = false;

    for(let i=0; i<this.filters.length; i++){
      this.filters[i].checked = false;
    }

    this.waiting = true;
    this.updateProducts();
    setTimeout(() => {
      this.waiting = false;

    },600);

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

  findProducts() {
    this.searched = true;
    this.filterOn = false;
    console.log(this.search);
    if(this.search === ""){
      axios
      .post('https://perlarest.vinoitalia.gr/php-auth-api/search.php', {
        search: '100',

      })
      .then((resData) => {
        this.waiting = true;
        console.log(resData.data);
        if (resData.data.products.length != 0) {
          setTimeout(() => {
            for (let favorite of this.favorites) {
              for (let prod of resData.data.products) {
                if (favorite.mtrl === prod.mtrl) {
                  prod.addedToFav = true;
                }
              }
            }
            this.waiting = false;
            // this.products = resData.data.products;
            // this.updateProducts();
            this.listArray = [];
            this.searched = false;
            this.message = '';
          }, 100);
        }
        else {
          setTimeout(() => {
            this.waiting = false;
            this.shownProducts = [];
          }, 100);
        }
      });
    }
    else{
      this.filterOn = true;
      axios
      .post('https://perlarest.vinoitalia.gr/php-auth-api/search.php', {
        search: this.search,
      })
      .then((resData) => {
        this.waiting = true;
        console.log(resData.data);
        if (resData.data.products.length != 0) {
          setTimeout(() => {
            for (let favorite of this.favorites) {
              for (let prod of resData.data.products) {
                if (favorite.mtrl === prod.mtrl) {
                  prod.addedToFav = true;
                }
              }
            }
            this.waiting = false;
            this.shownProducts = resData.data.products;
            this.message = '';
          }, 100);
        } else {
          setTimeout(() => {
            this.waiting = false;
            this.shownProducts = [];
          }, 100);
        }
      });
    }

  }
  handleWizzard(name: string, id: number) {
    this.productsService.setSingleProduct({
      name: name,
      id: id,
      category: 116,
    });
    this.router.navigate(['/products/product-page']);

    // this.router.navigate(['products/mosqui',id,name]);
  }
  ngOnDestroy(): void {
    console.log(this.router.url);
    this.shownProducts = [];
    this.products = [];
    // /products/product-page
    localStorage.setItem('page', this.page.toString());
    this.products = [];
    localStorage.setItem('keepPagination', 'false');
    console.log(this.listArray);
    this.shownProducts = [];
    if(this.router.url === '/products/product-page'){
      this.productsService.sendFilters(this.listArray)
    }
    this.listArray = [];
  }
}
