import { Category } from './../categories.model';
import {
  ChangeDetectorRef,
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
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {faDownload} from '@fortawesome/free-solid-svg-icons'

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
import { async } from '@angular/core/testing';

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
  config: any;
  faDownload = faDownload;
  faPen = faPen;
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

  fullscreen: boolean = false;

  notEmpty: boolean = false;

  amount: number = 1;
  mainCategories: any;

  mtrl: any;

  // isVisible: boolean = true;

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
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    // this.route.params.subscribe(resData => {
    //   console.log(resData);

    // })

    let temp = JSON.parse(localStorage.getItem("mtrl")||'{}');
    console.log(temp);

    if(temp.mtrl){

      console.log(temp.mtrl);
      this.mtrl = temp.mtrl;

      let req = await axios.post('https://perlaNodeRest.vinoitalia.gr/products/getSingle',
      {
        mtrl: this.mtrl
      })
        console.log(req.data.product);
          this.product = req.data.product;
          if(this.product.category != 116){
            let sugg =await axios.post("https://perlaNodeRest.vinoitalia.gr/products/getAllSuggested",
            {
              mtrl:this.product.mtrl
            })
              if(sugg.data.products.length > 0){
                this.notEmpty = true;
              }
              else{
                this.notEmpty = false;
              }


          }


    }
    else{
      console.log("eimai edo")
     let req = await axios.post('https://perlaNodeRest.vinoitalia.gr/products/getSingle',
      {
        name: temp.name,
        id: temp.id,
        category: temp.category
      })
        console.log(req.data);
        this.product = req.data;


    }







    this.productsService.getMainCategories().subscribe(resData => {
      this.mainCategories = resData;
      console.log(this.mainCategories);

    });

    this.productsService.suggProd.subscribe(resData => {
      let newProduct = JSON.parse(resData)
      console.log(newProduct);
      this.product = newProduct
      console.log(this.product);

      window.scrollTo(0,0);
    })

    // console.log(this.ref.detectChanges());
    this.currentLang = localStorage.getItem('lang');
    console.log(this.currentLang);

    window.scrollTo(0,0);

    // this.route.params.subscribe((params) => {
    //   this.filters = params;
    // });

    this.productsService.mosquiProductFound.subscribe((resData) => {
      this.waitingProduct = true;
      this.showForm = false;
      if(this.loggedIn){
        setTimeout(() => {
          console.log(resData);
          let subcategories: any;
          let selected_subcategory: any;
          this.mosquiProduct = resData;


          console.log(this.mosquiProduct);


          this.waitingProduct = false;
          if(this.mosquiProduct != undefined){
            // this.product = this.mosquiProduct;
            console.log(this.mosquiProduct.category);
            this.productsService.getAllCategories(116).subscribe((resData: any) => {
              console.log(resData.categories[0].subcategories);
              subcategories = resData.categories[0].subcategories;
              subcategories.forEach((subcat: any) => {
                if(subcat.sub_id == this.mosquiProduct.subcategory){
                  selected_subcategory = subcat;
                }
              })
              console.log(selected_subcategory);
              // this.productsService.setSingleProduct(this.mosquiProduct);
              // localStorage.setItem("mtrl",JSON.stringify(
              //   {
              //     name: null,
              //     id: null,
              //     category: null,
              //     mtrl: this.mosquiProduct.mtrl
              //   }));
              // setTimeout(() => {
                this.router.navigate(['products/',116,'Mosqui',selected_subcategory.sub_id,selected_subcategory.name,this.mosquiProduct.mtrl])
              // },50)
            })
          }
        }, 500);
      }
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

    // this.product = this.productsService.getSingelProduct();
    console.log(this.product);

    this.config = {
      placeholder: '',
      tabsize: 2,
      height: '200px',
      toolbar: [
          ['misc', ['codeview', 'undo', 'redo']],
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
          ['fontsize', ['fontname', 'fontsize', 'color']],
          ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
          ['insert', ['table', 'link',  'hr']]
      ],
      fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
    }

    // console.log(this.product.category);
    // console.log(typeof(this.product.description));
    if(this.loggedIn){

      this.getSeeEarlier();
    }




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

  openFullscreen(){
    this.fullscreen = true;
  }

  closeFullscreen(){
    this.fullscreen = false;
  }

  handleHoverDownload(btn:any){
    if (!btn.classList.contains('hoverDown')) {
      btn.classList.add('hoverDown');


    }
    else{
      btn.classList.remove('hoverDown')
      btn.classList.add('leaveDown');
      setTimeout(() => {
        btn.classList.remove('leaveDown')
      }, 400);
    }
  }

  async handleFindNew() {
    this.mosquiProduct = {};
    this.waitingProduct = true;
    this.showForm = true;
    setTimeout(() => {
      this.waitingProduct = false;
    }, 200);
  }

  async addToCartMosqui(btn: any) {
    if(+this.product.diathesima > 0){
      if (!btn.classList.contains('loading')) {
        btn.classList.add('loading');
        setTimeout(() => btn.classList.remove('loading'), 3700);
      }

      axios
        .get('https://perlanoderest.vinoitalia.gr/products/fetchCartItems', {
          params: {trdr: this.loadedUser.trdr},
        })
        .then((resData) => {
          this.cartService.sendProductCount(resData.data.products.length);
        });
      this.mosquiProduct.qty = this.amount;

      this.mosquiProduct.show = true;
      await this.cartService.addToCart(this.mosquiProduct);

      await this.cartService.sendProductAdded(true);
    }
    else{
      this.productsService.sendBackOrderPopup(true);

      this.productsService.backOrder.subscribe(async resData => {
        if(resData){
          if (!btn.classList.contains('loading')) {
            btn.classList.add('loading');
            setTimeout(() => btn.classList.remove('loading'), 3700);
          }

          axios
            .get('https://perlanoderest.vinoitalia.gr/products/fetchCartItems', {
             params: {trdr: this.loadedUser.trdr},
            })
            .then((resData) => {
              this.cartService.sendProductCount(resData.data.products.length);
            });
          this.mosquiProduct.qty = this.amount;

          this.mosquiProduct.show = true;
         await this.cartService.addToCart(this.mosquiProduct);

          await this.cartService.sendProductAdded(true);
        }
      })
    }
  }

  editData() {
    console.log('DATA');

    this.onEditData = true;
  }
  uploadDescription(btn: any) {
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => {
        if (this.desciptionForm.value.description == null) {


          if(this.mosquiProduct){
            if(this.mosquiProduct.description){
              this.desciptionForm.value.description = this.mosquiProduct.description
            }
            else{
              this.desciptionForm.value.description = '';
            }
          }
          else{
            if(this.product.description){
              this.desciptionForm.value.description = this.product.description
            }
            else{
              this.desciptionForm.value.description = '';
            }
          }
        }


        if (this.desciptionFormEng.value.descriptionEng == null) {
          if(this.mosquiProduct){
            if(this.mosquiProduct.description_eng){
              this.desciptionFormEng.value.descriptionEng = this.mosquiProduct.description_eng
            }
            else{
              this.desciptionFormEng.value.descriptionEng = '';
            }
          }
          else{
            if(this.product.description_eng){
              this.desciptionFormEng.value.descriptionEng = this.product.description_eng
            }
            else{
              this.desciptionFormEng.value.descriptionEng = '';
            }
          }
        }
        // this.desciptionFormEng.value.descriptionEng != null


        console.log(this.desciptionForm.value.description);

        console.log(this.desciptionFormEng.value.descriptionEng);


        if(this.mosquiProduct){

            console.log(this.desciptionForm.value.description);
            axios
              .post(
                'https://perlanoderest.vinoitalia.gr/products/updateDescription',
                {
                  mtrl: this.mosquiProduct.mtrl,
                  desc: this.desciptionForm.value.description,
                  desc_eng: this.desciptionFormEng.value.descriptionEng,
                }
              )
              .then((resData) => {
                console.log(resData.data);

                setTimeout(() => {
                  this.mosquiProduct.description = resData.data.description;
                  this.mosquiProduct.description_eng = resData.data.desc_eng;
                  // window.location.reload();
                }, 50);
              });



        }
        else{
            console.log(this.desciptionForm.value.description);
            axios
              .post(
                'https://perlanoderest.vinoitalia.gr/products/updateDescription',
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

        this.closeForm();
        btn.classList.remove('loading')
      },1500)
    }

  }

  login(){
    this.router.navigate(['log-in']);
  }

  deleteVideo(btn: any,mtrl: any){
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(async () => {
        if(this.mosquiProduct){
          let req = await axios.post(
            'https://perlaNodeRest.vinoitalia.gr/products/uploadVideo',
            {
              mtrl: this.mosquiProduct.mtrl,
              url: 'asd',
              method: 'Delete'
            }
          );
          console.log(req.data);
          this.mosquiProduct.video = req.data.video;
        }else{

          let req = await axios.post(
            'https://perlaNodeRest.vinoitalia.gr/products/uploadVideo',
            {
              mtrl: this.product.mtrl,
              url: 'asd',
              method: 'Delete'
            }
          );
          console.log(req.data);
          this.product.video = req.data.video;
          this.productsService.setSingleProduct(this.product);
        }
        btn.classList.remove('loading')
      },1500);
    }
  }
  updateDataSheet(btn: any) {
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => {
        if(this.mosquiProduct){
          console.log(this.mosquiProduct.mtrl);

          axios
          .post(
            'https://perlanoderest.vinoitalia.gr/products/updateDataSheet',
            {
              mtrl: this.mosquiProduct.mtrl,
              data_el: this.dataSheetForm.value.datas,
              data_en:this.dataSheetFormEng.value.datasEng
            }
          )
          .then((resData) => {
            setTimeout(() => {
              console.log(resData.data);

              this.mosquiProduct.data_sheet = resData.data.data_sheet;
              this.mosquiProduct.data_sheet_eng = resData.data.data_sheet_eng;
              //  window.location.reload();
            }, 50);
          });
        }
        else{
          axios
          .post(
            'https://perlanoderest.vinoitalia.gr/products/updateDataSheet',
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

        this.closeForm();
        btn.classList.remove('loading')
      },1500)
    }

  }
  closeForm() {
    this.onEditDesc = false;
    this.onEditData = false;
  }
  editDescription() {
    console.log(this.product.description);

    this.onEditDesc = true;
  }

  goToSeeEarlier(prod: any,div: any){
    let mainCategory: any;
    let subcategories: any;
    let product_subcategory: any;

    this.renderer.setStyle(div, 'transform', 'scale(0.95)');
    setTimeout(() => {
      this.renderer.setStyle(div, 'transform', 'scale(1)');
    },30)
    localStorage.setItem("mtrl",JSON.stringify(
      {
        name: null,
        id: null,
        category: null,
        mtrl: prod.mtrl
      }));
    console.log(prod.category);
    console.log(prod.subcategory);
    this.mainCategories.forEach((category: any) => {
      if(prod.category == category.id){
        mainCategory = category
      }
    })

    this.productsService.getAllCategories(mainCategory.id).subscribe((resData: any) => {
      console.log(resData.categories[0].subcategories);
      subcategories = resData.categories[0].subcategories;
      subcategories.forEach((subcat: any) => {
        if(subcat.sub_id == this.product.subcategory){
          product_subcategory = subcat;
        }
      })
      console.log(product_subcategory!);


      this.router.navigate(['products',mainCategory.id,mainCategory.name,product_subcategory.sub_id,product_subcategory.name,this.product.mtrl]);
      setTimeout(() => {
        window.location.reload()
      },50)
    })
    // window.scrollTo(0,0);
  }

  async getSeeEarlier() {
    if(this.loggedIn){
      let req = await axios.post(
        'https://perlanoderest.vinoitalia.gr/products/getSeeEarlier',
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
  }

  addToCart(btn: any) {
    this.qty = this.amount;

    console.log(this.product);

    let counter = 0;
    if(+this.product.diathesima > 0){
      if (!btn.classList.contains('loading')) {
        btn.classList.add('loading');
        setTimeout(() => btn.classList.remove('loading'), 3700);
      }
      console.log(btn);

      axios
        .get('https://perlanoderest.vinoitalia.gr/products/fetchCartItems', {
          params:{trdr: this.loadedUser.trdr},
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
      setTimeout(async() => {
        this.product.qty = this.qty;
        console.log(this.product.qty);
        console.log(this.relatedProducts);

        if (this.relatedProducts.length <= 0) {
          this.cartService.setId(this.product.mtrl);

          this.productsService.setSingleProduct(this.product);
          this.product.show = true;
          console.log("JINGLE");

          await this.cartService.addToCart(this.product, false, true);
          setTimeout(async ()=>{

            await this.cartService.sendProductAdded(true);
          },200)
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
    else{
      this.productsService.sendBackOrderPopup(true);

      this.productsService.backOrder.subscribe(resData => {
        if(resData && counter == 0){
          if (!btn.classList.contains('loading')) {
            btn.classList.add('loading');
            setTimeout(() => btn.classList.remove('loading'), 3700);
          }
          console.log(btn);

          axios
            .get('https://perlanoderest.vinoitalia.gr/products/fetchCartItems', {
              params:{trdr: this.loadedUser.trdr},
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
          setTimeout(async() => {
            this.product.qty = this.qty;
            console.log(this.product.qty);
            console.log(this.relatedProducts);

            if (this.relatedProducts.length <= 0) {
              this.cartService.setId(this.product.mtrl);

              this.productsService.setSingleProduct(this.product);
              this.product.show = true;
              console.log("JINGLE");
              counter++;
             await this.cartService.addToCart(this.product, false, true);

             await this.cartService.sendProductAdded(true);
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
      })
    }

  }

  handleAddToFavorite(prod?: any) {
    if (prod) {
      if (prod.addedToFav) {
        prod.addedToFav = false;
        this.productAddedToFav = true;
        setTimeout(() => {
          prod.addedToFav = false;
        }, 350);
        setTimeout(() => {
          this.productAddedToFav = false;
        }, 1000);
        this.cartService.removeOneFav(this.mosquiProduct);
        setTimeout(() => {
          this.cartService.sendProductAddedToFav(false);
        })
      } else {
        this.productAddedToFav = true;
        setTimeout(() => {
          prod.addedToFav = true;
        }, 350);
        setTimeout(() => {
          this.productAddedToFav = false;
        }, 1000);
        this.cartService.sendProductAddedToFav(true);
        this.cartService.addToFavorites(this.mosquiProduct);
      }
    } else {
      if (this.product.addedToFav) {
        this.product.addedToFav = true;
        this.productAddedToFav = true;
        setTimeout(() => {
          this.product.addedToFav = false;
        }, 350);
        setTimeout(() => {
          this.productAddedToFav = false;
        }, 1000);
        this.cartService.removeOneFav(this.product);
        setTimeout(() => {
          this.cartService.sendProductAddedToFav(false);
        },50)
      } else {
        console.log(this.product);

        this.productAddedToFav = true;
        setTimeout(() => {
          this.product.addedToFav = true;
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

  newStepper(increment: boolean){
    if(increment){
      this.amount++;
    }
    else{
      this.amount--;
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
  urlOpen: boolean = false;
  openURL() {
    if(this.urlOpen){
      this.urlOpen = false;
    }
    else{
      this.urlOpen = true;
    }
  }

  async uploadUrl(btn: any) {
    if (!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(async () => {
        if(this.mosquiProduct){
          let req = await axios.post(
            'https://perlaNodeRest.vinoitalia.gr/products/uploadVideo',
            {
              mtrl: this.mosquiProduct.mtrl,
              url: this.urlVideoForm.value.video,
            }
          );
          console.log(req.data);
          this.mosquiProduct.video = req.data.video;
        }else{

          let req = await axios.post(
            'https://perlaNodeRest.vinoitalia.gr/products/uploadVideo',
            {
              mtrl: this.product.mtrl,
              url: this.urlVideoForm.value.video,
            }
          );
          console.log(req.data);
          this.product.video = req.data.video;
          this.productsService.setSingleProduct(this.product);
        }

        btn.classList.remove('loading')
      },1500);
    }

  }

  ngOnDestroy(): void {
    console.log(this.router.url.split('/')[2]);
    console.log(this.product.category);
    console.log(this.filters);

    if (this.router.url.split('/')[2] == this.product.category ||this.router.url.split('/')[2] == this.mosquiProduct.category ) {
      this.productsService.sendFilters(this.filters);
    }

    localStorage.removeItem('mtrl');

    // /products/product-page
  }
}
