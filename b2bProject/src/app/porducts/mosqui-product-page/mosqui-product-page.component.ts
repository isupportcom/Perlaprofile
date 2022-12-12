import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Component, HostListener, OnInit, Renderer2, OnDestroy } from '@angular/core';
import axios from 'axios';

//Forms
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

//services
import { AuthService } from './../../services/auth.service';
import { ProductsService } from 'src/app/porducts/products.service';
import { CartServiceService } from './../../cart/cart-service.service';

//icons
import {faPen} from '@fortawesome/free-solid-svg-icons'
import {faDownload} from '@fortawesome/free-solid-svg-icons'

//Swiper
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
  selector: 'app-mosqui-product-page',
  templateUrl: './mosqui-product-page.component.html',
  styleUrls: ['./mosqui-product-page.component.css']
})
export class MosquiProductPageComponent implements OnInit, OnDestroy {
  category_details: any = JSON.parse(localStorage.getItem('mtrl') || '{}');;

  // Summernote config
  config: any = {
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

  //Swiper config
  slidesShown?: boolean;
  innerWidth!: number;
  fullscreen!: boolean;

  //For wizzard
  showForm: boolean = true;
  waitingProduct: boolean = false;

  //The product that was found
  mosquiProduct: any;

  //The qty of the product
  amount: number = 1;

  //If user is logged in
  username = localStorage.getItem('username');
  loggedIn = this.username ? true : false;

  //User
  loadedUser = JSON.parse(localStorage.getItem('userData') || '{}');
  isAdmin = this.authService.getAdmin();

  //Favorites
  productAddedToFav: boolean = false;

  //Description
  showDesc = [true, false, false, false];
  switchDesc = false;
  onEditDesc: boolean = false;
  onEditData: boolean = false;
  urlOpen: boolean = false;
  mode: string = 'Περιγραφής';
  smallerLine?: boolean;
  desciptionForm: FormGroup | any;
  desciptionFormEng: FormGroup | any;
  dataSheetForm: FormGroup | any;
  dataSheetFormEng:FormGroup  |any;
  urlVideoForm: FormGroup | any;

  //icons
  faPen = faPen;
  faDownload = faDownload;

  //language
  currentLang: any = localStorage.getItem('lang');

  //seeEarlier
  howManySeen: any;
  seeEarlier: any;
  isEmpty: boolean | any;
  seeLess: any = [];

  //categories
  mainCategories: any;

  //product found check
  executeNgOnInit: boolean = true;

  onSwiper(e: Event) {}
  onSlideChange(swiper: SwiperComponent) {}

  thumbsSwiper: any;
  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }

  constructor(private cartService: CartServiceService,private productsService: ProductsService,private authService: AuthService,private fb: FormBuilder,private router: Router,private renderer: Renderer2,private route: ActivatedRoute) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;

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

    if (this.innerWidth <= 1200) {
      this.smallerLine = true;
    } else {
      this.smallerLine = false;
    }
  }

  ngOnInit(): void {
    console.log(this.category_details);


    this.route.params.subscribe(params => {
      console.log(params);

      console.log(params['cat_id']);
      console.log(params['product_mtrl']);

      if(params['cat_id'] == '116' && params['product_mtrl']){
        this.executeNgOnInit = false;

      }
    })

    let temp = JSON.parse(localStorage.getItem("mtrl")||'{}');
    console.log(temp);

    if(this.category_details.mtrl != undefined){
      axios.post('https://perlaNodeRest.vinoitalia.gr/products/getSingle',
      {
        name: temp.name,
        id: temp.id,
        category: temp.category
      }).then(async resData => {
        console.log(resData.data);
        this.category_details = resData.data;

      })
    }
    else{
      axios.post('https://perlaNodeRest.vinoitalia.gr/products/getSingle',
      {
        mtrl: this.category_details.mtrl
      }).then(async resData => {
        this.mosquiProduct = resData.data;
      })
    }

    this.productsService.getMainCategories().subscribe(resData => {
      this.mainCategories = resData;
      console.log(this.mainCategories);

    });

    if(this.loggedIn){
      this.getSeeEarlier();
    }

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

    this.innerWidth = window.innerWidth;
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

    if (this.innerWidth <= 1200) {
      this.smallerLine = true;
    } else {
      this.smallerLine = false;
    }

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
            console.log(this.mosquiProduct.category);
            this.productsService.getAllCategories(116).subscribe((resData: any) => {
              console.log(resData.categories[0].subcategories);
              subcategories = resData.categories[0].subcategories;
              subcategories.forEach((subcat: any) => {
                if(subcat.sub_id == this.mosquiProduct.subcategory){
                  selected_subcategory = subcat;
                }
              })
              console.log(selected_subcategory!);
              localStorage.setItem("mtrl",JSON.stringify(
                {
                  name: selected_subcategory.name,
                  id: selected_subcategory.sub_id,
                  category: 116,
                  mtrl: this.mosquiProduct.mtrl
                }));
              setTimeout(() => {
                this.router.navigate(['products/116/Mosqui',selected_subcategory.sub_id,selected_subcategory.name,this.mosquiProduct.mtrl])
              },100)
            })
          }
        }, 200);
      }
    });

  }

  login(){
    this.router.navigate(['log-in']);
  }

  openFullscreen(){
    this.fullscreen = true;
  }

  closeFullscreen(){
    this.fullscreen = false;
  }

  handleFindNew() {
    this.mosquiProduct = {};
    this.waitingProduct = true;
    this.showForm = true;
    console.log(this.category_details);

    localStorage.setItem("mtrl",JSON.stringify(
      {
        name: this.category_details.name,
        id: this.category_details.id,
        category: 116,
        mtrl: null
      }));

    setTimeout(() => {
      this.waitingProduct = false;
      this.router.navigate(['products/116/Mosqui',this.category_details.id,this.category_details.name])
    }, 200);
  }

  newStepper(increment: boolean){
    if(increment){
      this.amount++;
    }
    else{
      this.amount--;
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

  openURL() {
    if(this.urlOpen){
      this.urlOpen = false;
    }
    else{
      this.urlOpen = true;
    }
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
        if(subcat.sub_id == prod.subcategory){
          product_subcategory = subcat;
        }
      })
      console.log(product_subcategory!);


      this.router.navigate(['products',mainCategory.id,mainCategory.name,product_subcategory.sub_id,product_subcategory.name,prod.mtrl]);
      setTimeout(() => {
        window.location.reload()
      },50)
    })
    // window.scrollTo(0,0);
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
              mtrl: this.category_details.mtrl,
              url: this.urlVideoForm.value.video,
            }
          );
          console.log(req.data);
          this.category_details.video = req.data.video;
          this.productsService.setSingleProduct(this.category_details);
        }

        btn.classList.remove('loading')
      },1500);
    }

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
              mtrl: this.category_details.mtrl,
              url: 'asd',
              method: 'Delete'
            }
          );
          console.log(req.data);
          this.category_details.video = req.data.video;
          this.productsService.setSingleProduct(this.category_details);
        }
        btn.classList.remove('loading')
      },1500);
    }
  }

  editDescription() {
    console.log(this.category_details.description);

    this.onEditDesc = true;
  }

  closeForm() {
    this.onEditDesc = false;
    this.onEditData = false;
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
            if(this.category_details.description){
              this.desciptionForm.value.description = this.category_details.description
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
            if(this.category_details.description_eng){
              this.desciptionFormEng.value.descriptionEng = this.category_details.description_eng
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
                  mtrl: this.category_details.mtrl,
                  desc: this.desciptionForm.value.description,
                  desc_eng: this.desciptionFormEng.value.descriptionEng,
                }
              )
              .then((resData) => {
                console.log(resData.data);

                setTimeout(() => {
                  this.category_details.description = resData.data.description;
                  this.category_details.description_eng = resData.data.desc_eng;
                  // this.productsService.setSingleProduct(this.category_details);
                  // window.location.reload();
                }, 50);
              });

        }

        this.closeForm();
        btn.classList.remove('loading')
      },1500)
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
              mtrl: this.category_details.mtrl,
              data_el: this.dataSheetForm.value.datas,
              data_en:this.dataSheetFormEng.value.datasEng
            }
          )
          .then((resData) => {
            setTimeout(() => {
              console.log(resData.data);

              this.category_details.data_sheet = resData.data.data_sheet;
              this.category_details.data_sheet_eng = resData.data.data_sheet_eng;
              console.log(this.category_details);

              this.productsService.setSingleProduct(this.category_details);
              //  window.location.reload();
            }, 50);
          });
        }

        this.closeForm();
        btn.classList.remove('loading')
      },1500)
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

  handleAddToFavorite(prod: any) {

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

  }

  async addToCartMosqui(btn: any) {
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

  ngOnDestroy(): void {
  }
}
