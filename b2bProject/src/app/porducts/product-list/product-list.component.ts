import {
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
import { Category } from '../categories.model';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationControlsComponent } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

interface mainCat {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
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
  faChevronRight = faChevronRight;
  loggedIn: boolean = localStorage.getItem('username') ? true : false;
  products: product | any = [];
  totalLength: number | undefined;
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
  listArray?: any;
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

  async ngOnInit(){
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


    this.route.params.subscribe((params) => {
      console.log(params);

      console.log(+params['cat_id']);
      console.log(params['cat_name']);

      this.mainCategory.id = +params['cat_id'];
      this.productsService
        .getAllCategories(this.mainCategory.id)
        .subscribe((resData: any) => {
          console.log(resData.cat[0].subcategory);
          this.productsService.setAllCategoriesArray(
            resData.cat[0].subcategory
          );
          this.categories = this.productsService.getCategoriesArray();
          console.log(this.categories);
        });

      this.mainCategory.name = params['cat_name'];

      this.productsService.setMainCategory(this.mainCategory);

      localStorage.setItem(
        'currentCategory',
        JSON.stringify(this.mainCategory)
      );
    });
    console.log(JSON.parse(localStorage.getItem('products') || '{}'));

    console.log(this.mainCategory.id);
    setTimeout(()=>{
      axios.post('https://perlarest.vinoitalia.gr/php-auth-api/getAllProducts.php/?id=2&method=allProducts/')
      .then(async (resData: any) => {
        console.log(resData.data);

        console.log(resData.data);
        this.shownProducts = resData.data.products;
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
          this.filterList = Object.values(resData)



          for(let filter of this.filterList){
            this.listArray.push(filter);
          }


          setTimeout(() => {
            console.log(this.filters);

            for(let i=0; i<this.filters.length; i++){
              for(let id of this.listArray){
                if(id === this.filters[i].value){
                  this.filters[i].checked = true;
                  // this.handleCheckboxes(this.filters[i]);
                }
              }
            }


            this.executed = true;
          },300)
        })

          // this.updateProducts();


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
    },50)









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
    return this.http.post(
      'https://perlarest.vinoitalia.gr/products/favorites.php',
      {
        trdr: this.loadedUser.trdr,
        mtrl: 'dontNeedIt',
        mode: 'fetch',
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

  handleCheckboxes(e: any, clickeP?: boolean) {


    if (clickeP) {
      if (!e.checked) {
        e.checked = true;
      } else {
        e.checked = false;
      }
      if (e.checked) {
        this.listArray.push(e.value);
        this.waiting = true;
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
    } else {
      if (e.checked) {
        this.listArray.push(e.value);
        this.waiting = true;
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
        console.log(this.productsService.getAll());
        let temp: any = this.productsService.getAll();

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

    }, 800);
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
    window.location.reload();
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
    console.log('mpike gia res');
    axios
      .post('https://perlarest.vinoitalia.gr/php-auth-api/search.php', {
        search: this.search,
      })
      .then((resData) => {
        this.waiting = true;
        console.log(resData.data.products);
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
  handleWizzard(name: string, id: number) {
    this.productsService.setSingleProduct({
      name: name,
      id: id,
      category: 116,
    });
    this.router.navigate(['/products/product-page']);

    // this.router.navigate(['products/mosqui',id,name]);
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
  ngOnDestroy(): void {
    console.log(this.router.url);
    // /products/product-page

    console.log(this.listArray);
    this.shownProducts = [];
    if(this.router.url === '/products/product-page'){
      this.productsService.sendFilters(this.listArray)
    }
    this.listArray = [];
  }
}
