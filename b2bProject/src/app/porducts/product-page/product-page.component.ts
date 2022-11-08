import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ProductsService } from '../products.service';
import { product } from '../../AdminArea/adminareaproducts/adminareaproducts.component';
import { Observable, tap } from 'rxjs';
import { CartServiceService } from '../../cart/cart-service.service';
import { NgForm } from '@angular/forms';
import axios from 'axios';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

import { SwiperComponent } from 'swiper/angular';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
]);

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  favorites: any;
  showDesc = [true, false, false, false];
  seeEarlier: any;
  howManySeen: any;
  seeLess: any = [];
  isEmpty: boolean | any;
  slidePosition!: number;
  switchDesc = false;
  suggested: any;
  isAdmin = this.authService.getAdmin();
  hasRelated: any = false;
  onEditDesc: boolean = false;
  onEditData: boolean = false;
  altCartAnimation: boolean = false;
  @ViewChild('description') desc: ElementRef | undefined;
  @ViewChild('dataSheet') dataSheet: ElementRef | undefined;
  @ViewChild('swiperRef', { static: false }) swiperRef?: SwiperComponent;
  relatedProducts: product | any = [];
  product: product | any;
  suggestedProducts: product | any;
  hasSuggested: boolean = false;
  innerWidth: any;
  qty: any = 1;
  urlOpen: boolean = false;
  mode: string = 'Περιγραφής';
  desciptionForm: FormGroup | any;
  dataSheetForm: FormGroup | any;
  dataSheetFormEng:FormGroup  |any;
  urlVideoForm: FormGroup | any;

  desciptionFormEng: FormGroup | any;
  slides = [1, 2, 3, 4];
  slidesShown?: boolean;
  loadedUser = JSON.parse(localStorage.getItem('userData') || '{}');
  username = localStorage.getItem('username');
  loggedIn = this.username ? true : false;
  show!: boolean;
  thumb: any;

  mosquiProduct: any;
  showForm: boolean = true;
  waitingProduct: boolean = false;

  smallerLine?: boolean;
  productAddedToFav: boolean = false;
  added?: boolean;

  filters: any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 768) {
      this.altCartAnimation = true;
    } else {
      this.altCartAnimation = false;
    }

    if (this.innerWidth <= 1200) {
      this.smallerLine = true;
    } else {
      this.smallerLine = false;
    }

    if (this.innerWidth <= 992) {
      this.howManySeen = true;
    } else {
      this.howManySeen = false;
    }

    if (this.innerWidth <= 576) {
      this.slidesShown = true;
    } else {
      this.slidesShown = false;
    }
  }
  onSwiper(e: Event) {}
  onSlideChange(swiper: SwiperComponent) {}

  thumbsSwiper: any;
  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }

  profile: FormGroup | any;
  currentLang: any;
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private renderer: Renderer2,
    private el: ElementRef,
    private productsService: ProductsService,
    private cartService: CartServiceService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.currentLang = localStorage.getItem('lang');
    console.log(this.currentLang);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    this.route.params.subscribe((params) => {
      this.filters = params;
    });

    this.productsService.mosquiProductFound.subscribe((resData) => {
      this.waitingProduct = true;
      this.showForm = false;
      setTimeout(() => {
        this.mosquiProduct = resData[0];
        console.log(this.mosquiProduct);
        this.productsService.setSingleProduct(this.mosquiProduct);
        this.product = this.productsService.getSingelProduct();
        let favouritesObs: Observable<any>;

        favouritesObs = this.getFavourites();

        favouritesObs.subscribe((resData) => {
          this.favorites = resData.products;
        });
        setTimeout(() => {
          for (let favorite of this.favorites) {
            if (this.mosquiProduct.mtrl === favorite.mtrl) {
              console.log('HeHe');
              this.added = true;
              this.mosquiProduct.addedToFav = true;
            }
          }

          if (!this.mosquiProduct.addedToFav) {
            this.added = false;
            this.mosquiProduct.addedToFav = false;
          }
        }, 500);
        this.waitingProduct = false;
      }, 200);
    });

    this.dataSheetForm = this.fb.group({
      datas: [null],
    });
    this.urlVideoForm = this.fb.group({
      video: [null],
    });
    this.desciptionForm = this.fb.group({
      description: [null],
    });
    this.desciptionFormEng = this.fb.group({
      descriptionEng: [null],
    });
    this.dataSheetFormEng = this.fb.group({

      datasEng: [null]

    })

    console.log(this.loggedIn);

    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 768) {
      this.altCartAnimation = true;
    } else {
      this.altCartAnimation = false;
    }

    if (this.innerWidth <= 576) {
      this.slidesShown = true;
    } else {
      this.slidesShown = false;
    }

    if (this.innerWidth <= 1200) {
      this.smallerLine = true;
    } else {
      this.smallerLine = false;
    }

    if (this.innerWidth <= 992) {
      this.howManySeen = true;
    } else {
      this.howManySeen = false;
    }

    this.product = this.productsService.getSingelProduct();
    console.log(this.product);
    // console.log(this.product.category);
    // console.log(typeof(this.product.description));

    let favouritesObs: Observable<any>;

    favouritesObs = this.getFavourites();

    favouritesObs.subscribe((resData) => {
      this.favorites = resData.products;
    });

    setTimeout(() => {
      console.log(this.favorites);
      if (this.product.category != 116) {
        if (this.favorites) {
          for (let favorite of this.favorites) {
            if (this.product.mtrl === favorite.mtrl) {
              console.log('HeHe');
              this.added = true;
              this.product.addedToFav = true;
            }
          }
        }

        if (!this.product.addedToFav) {
          this.added = false;
          this.product.addedToFav = false;
        }
      }
    }, 200);

    this.getSeeEarlier();
  }

  getFavourites() {
    return this.http.post(
      'https://perlarest.vinoitalia.gr/php-auth-api/favorites.php',
      {
        trdr: this.loadedUser.trdr,
        mtrl: 'dontNeedIt',
        mode: 'fetch',
      }
    );
  }

  handleFindNew() {
    this.waitingProduct = true;
    this.showForm = true;
    this.mosquiProduct = null;
    setTimeout(() => {
      this.waitingProduct = false;
    }, 200);
  }

  addToCartMosqui(btn: any) {
    if (!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => btn.classList.remove('loading'), 3700);
    }

    axios
      .post('https://perlarest.vinoitalia.gr/php-auth-api/fetchCartItems.php', {
        trdr: this.loadedUser.trdr,
      })
      .then((resData) => {
        this.cartService.sendProductCount(resData.data.products.length);
      });
    this.mosquiProduct.qty = this.qty;

    this.mosquiProduct.show = true;
    this.cartService.addToCart(this.mosquiProduct);

    this.cartService.sendProductAdded(true);
  }

  editData() {
    console.log('DATA');

    this.onEditData = true;
  }
  uploadDescription() {
    if (
      this.desciptionForm.value.description != null &&
      this.desciptionFormEng.value.descriptionEng != null
    ) {
      console.log(this.desciptionForm.value.description);
      console.log(this.desciptionFormEng.value.descriptionEng);
      console.log( this.product.mtrl);
      console.log(this.mosquiProduct.mtrl);

      if(this.product.mtrl == undefined){
          axios.post(
            "https://perlarest.vinoitalia.gr/php-auth-api/updateDescription.php",
            {
              mtrl: this.mosquiProduct.mtrl,
              desc: this.desciptionForm.value.description,
              desc_eng: this.desciptionFormEng.value.descriptionEng
            }
          )
          .then(resData=>{
            console.log(resData.data);
            setTimeout(()=>{

              this.mosquiProduct.description = this.desciptionForm.value.description;
              this.mosquiProduct.description_eng = this.desciptionFormEng.value.descriptionEng;
              this.productsService.setSingleProduct(this.mosquiProduct);
            },50)
          })
      }else{
        axios
        .post(
          'https://perlarest.vinoitalia.gr/php-auth-api/updateDescription.php',
          {
            mtrl: this.product.mtrl,
            desc: this.desciptionForm.value.description,
            desc_eng: this.desciptionFormEng.value.descriptionEng,
          }
        )
        .then((resData) => {
          console.log(resData.data);

          setTimeout(() => {
            this.product.description = resData.data.description;
            this.product.description_eng = resData.data.desc_eng;
            this.productsService.setSingleProduct(this.product);
            // window.location.reload();
          }, 50);
        });
    }
      }

  }
  updateDataSheet() {
    console.log(this.dataSheetForm.value.datas);
    console.log(this.dataSheetFormEng.value.datasEng);
    console.log( this.product.mtrl);
    console.log(this.mosquiProduct.mtrl);
    if(this.product.mtrl == undefined){
      axios.post(
        "https://perlarest.vinoitalia.gr/php-auth-api/updateDataSheet.php",
        {
          mtrl:this.mosquiProduct.mtrl,
          data_el: this.dataSheetForm.value.datas,
          data_en:this.dataSheetFormEng.value.datasEng
        }
      )
      .then(
        resData=>{
          console.log(resData.data);

          setTimeout(()=>{
            this.mosquiProduct.data_sheet = resData.data.data_sheet;
            this.mosquiProduct.data_sheet_eng = resData.data.data_sheet_eng;
            this.productsService.setSingleProduct(this.mosquiProduct);
          },50)
        }
      )
    }else{


      axios
      .post(
        'https://perlarest.vinoitalia.gr/php-auth-api/updateDataSheet.php',
        {
          mtrl: this.product.mtrl,
          data_el: this.dataSheetForm.value.datas,
          data_en:this.dataSheetFormEng.value.datasEng
        }
        )
        .then((resData) => {
          setTimeout(() => {
            console.log(resData.data);

            this.product.data_sheet = resData.data.data_sheet;
            this.product.data_sheet_eng = resData.data.data_sheet_eng;
            console.log(this.product);

            this.productsService.setSingleProduct(this.product);
            //  window.location.reload();
          }, 50);
        });
      }
    }
  closeForm() {
    window.location.reload();
  }
  editDescription() {
    this.onEditDesc = true;
  }

  async getSeeEarlier() {
    let req = await axios.post(
      'https://perlarest.vinoitalia.gr/php-auth-api/getAllSeeEarlier.php',
      {
        trdr: this.loadedUser.trdr,
      }
    );
    this.seeEarlier = req.data.products;
    if (this.seeEarlier.length == 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }

    console.log(this.seeEarlier);
    for (let i = 0; i < 4; i++) {
      this.seeLess.push(this.seeEarlier[i]);
    }
    console.log(this.seeLess);
  }

  addToCart(btn: any) {
    if (!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => btn.classList.remove('loading'), 3700);
    }
    console.log(btn);

    axios
      .post('https://perlarest.vinoitalia.gr/php-auth-api/fetchCartItems.php', {
        trdr: this.loadedUser.trdr,
      })
      .then((resData) => {
        this.cartService.sendProductCount(resData.data.products.length);
      });

    let relatedProductsObs: Observable<any>;

    relatedProductsObs = this.productsService.getRelatedProducts(
      this.product.mtrl
    );

    relatedProductsObs.subscribe((resData) => {
      console.log(resData);

      this.relatedProducts = resData.related;
    });
    setTimeout(() => {
      this.product.qty = this.qty;
      console.log(this.product.qty);
      console.log(this.relatedProducts);

      if (this.relatedProducts.length <= 0) {
        this.cartService.setId(this.product.mtrl);

        this.productsService.setSingleProduct(this.product);
        this.product.show = true;
        this.cartService.addToCart(this.product, false, true);

        this.cartService.sendProductAdded(true);
      } else {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        this.productsService.setSingleProduct(this.product);
        this.cartService.sendStartScope(true);
      }
    }, 500);
  }

  handleAddToFavorite(prod?: any) {
    if (prod) {
      if (this.added) {
        this.product.addedToFav = false;
        this.productAddedToFav = true;
        setTimeout(() => {
          this.added = false;
        }, 350);
        setTimeout(() => {
          this.productAddedToFav = false;
        }, 1000);
        this.cartService.removeOneFav(this.mosquiProduct);
      } else {
        this.productAddedToFav = true;
        setTimeout(() => {
          this.added = true;
        }, 350);
        setTimeout(() => {
          this.productAddedToFav = false;
        }, 1000);
        this.cartService.sendProductAddedToFav(true);
        this.cartService.addToFavorites(this.mosquiProduct);
      }
    } else {
      if (this.added) {
        this.product.addedToFav = false;
        this.productAddedToFav = true;
        setTimeout(() => {
          this.added = false;
        }, 350);
        setTimeout(() => {
          this.productAddedToFav = false;
        }, 1000);
        this.cartService.removeOneFav(this.product);
      } else {
        console.log(this.product);

        this.productAddedToFav = true;
        setTimeout(() => {
          this.added = true;
        }, 350);
        setTimeout(() => {
          this.productAddedToFav = false;
        }, 1000);
        this.cartService.sendProductAddedToFav(true);
        this.cartService.addToFavorites(this.product);
      }
    }
  }
  animation(btn: any) {
    if (!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => {
        btn.classList.remove('loading');
      }, 2700);
    }
  }

  stepper(myInput: any, btn: any) {
    let id = btn.id;
    let min = myInput.getAttribute('min');
    let max = myInput.getAttribute('max');
    let step = myInput.getAttribute('step');
    let val = myInput.getAttribute('value');
    let calcStep = id == 'increment' ? step * 1 : step * -1;
    let newValue = parseInt(val) + calcStep;
    this.qty = newValue;

    if (newValue >= min && newValue <= max) {
      myInput.setAttribute('value', newValue);
    }
  }

  ul(index: any) {
    for (let i = 0; i < this.showDesc.length; i++) {
      if (i === index) {
        this.showDesc[i] = true;
      } else {
        this.showDesc[i] = false;
      }
    }
    if (index == 0) {
      this.switchDesc = false;
      this.onEditData = false;
      this.onEditDesc = false;
      this.urlOpen = false;
    } else if (index == 1) {
      this.mode = 'Data Sheet';
      this.switchDesc = true;
      this.onEditData = false;
      this.onEditDesc = false;
      this.urlOpen = false;
    } else if (index == 3) {
      this.switchDesc = false;
      this.onEditData = false;
      this.onEditDesc = false;
      this.urlOpen = true;
    } else {
      this.switchDesc = false;
      this.onEditData = false;
      this.onEditDesc = false;
      this.urlOpen = false;
    }

    var underlines: any = document.querySelectorAll('.underline');

    let goLeft;

    if (this.smallerLine) {
      goLeft = 165;
    } else {
      goLeft = 100;
    }

    for (var i = 0; i < underlines.length; i++) {
      underlines[i].setAttribute(
        'style',
        'transform: translate3d(' + index * goLeft + '%,0,0);'
      );
    }
  }
  downloadMyFile(pdf: any) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute(
      'href',
      'https://perlarest.vinoitalia.gr/php-auth-api/pdf/' + pdf
    );
    link.setAttribute('download', pdf);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  openURL() {
    this.urlOpen = true;
  }

  async uploadUrl() {
    let req = await axios.post(
      'https://perlarest.vinoitalia.gr/php-auth-api/uploadVideo.php',
      {
        mtrl: this.product.mtrl,
        url: this.urlVideoForm.value.video,
      }
    );
    console.log(req.data);
    this.product.video = req.data.video;
    this.productsService.setSingleProduct(this.product);
  }

  ngOnDestroy(): void {
    console.log(this.router.url.split('/')[2]);
    console.log(this.product.category);
    console.log(this.filters);

    if (this.router.url.split('/')[2] == this.product.category) {
      this.productsService.sendFilters(this.filters);
    }

    // /products/product-page
  }
}
