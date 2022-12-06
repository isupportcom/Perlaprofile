import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../porducts/products.service';
import axios from "axios";
import { TranslateConfigService } from '../services/translate-config.service';
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
  Swiper,
  SwiperOptions,
} from 'swiper';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

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
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],

})
export class HomepageComponent implements OnInit {
  mainCategories : any = [];
  loadedUser:any
  showDescription1: boolean = false;
  showDescription2: boolean = false;
  showDescription3: boolean = false;
  showDescription4: boolean = false;
  seeEarlier:any;
  isEmpry:boolean=false;
  offer1:any = [];
  offer2:any=[];
  currentLang:string|any;
  carousel : any;
  source: string = '../../assets/pexels-expect-best-323772.jpg';
  showLoggedInContent: boolean = false;
  username = localStorage.getItem('username');
  upokatastima: any;
  swiper = new Swiper('.swiper', {
    autoplay:{
      delay: 2000,
    }
  })
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    pagination: { clickable: true },
    autoplay:{
      delay: 5000
    }
  };
  constructor(private productsService: ProductsService,private router: Router,private translate:TranslateConfigService,private renderer: Renderer2,private elementRef: ElementRef) { }
  onSwiper(e: Event) {}
  onSlideChange(swiper: SwiperComponent) {}

  thumbsSwiper: any;
  setThumbsSwiper(swiper: any) {
    this.thumbsSwiper = swiper;
  }
  innerWidth:any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth
    console.log(this.innerWidth);


    if(this.innerWidth <= 770){
      this.source = '../../assets/hero 770px width.png';
    }
    else if(this.innerWidth <= 985){
      this.source = '../../assets/hero 985px width.png';
    }
    else if(this.innerWidth <= 1200){
      this.source = '../../assets/hero 1200px width.png';
    }
    else if(this.innerWidth <= 9999){
      this.source = '../../assets/pexels-expect-best-323772.jpg';

    }
    else{
      this.source = '../../assets/hero 770px width.png';
    }

  }

   ngOnInit() {

    axios.post('https://perlanoderest.vinoitalia.gr/carousel/getCarousel')
    .then(resData=>{
      console.log(resData.data)
      this.carousel = resData.data.carousels
    })



     this.currentLang = localStorage.getItem('lang');
     this.loadedUser = JSON.parse(localStorage.getItem('userData') || '{}');
     this.upokatastima = JSON.parse(localStorage.getItem('upokatastima') || '{}');
     // this.getSeeEarlier();

     console.log(this.upokatastima);

    if(this.username){
      this.showLoggedInContent = true;
    }
    else{
      this.showLoggedInContent = false;
    }



    this.productsService.getMainCategories().subscribe(resData => {
      this.mainCategories = resData;
      console.log(this.mainCategories);

    });

    axios.post("https://perlanoderest.vinoitalia.gr/products/getAllOffers",{
      product:"Home",
      offer:"Home"
    }).then(resData=>{

      console.log(resData.data.products)
      this.offer1 = resData.data.products
      // console.log(this.offer1)

    })
  }

  handleOfferHover(offerImg: any){
    offerImg.classList.add('hoverBox');
  }
  handleOfferHoverLeave(offerImg: any){

    offerImg.classList.remove('hoverBox');
  }
  goToProductPage( product:any){
    this.productsService.setSingleProduct(product);
    this.router.navigate(['../products/product-page']);
  }

  goToProducts(mainCategory: any){
    console.log(mainCategory);
    let subcategories: any;
    let first_subcat: any;

    this.productsService.getAllCategories(mainCategory.id).subscribe((resData: any) => {
      console.log(resData.categories[0].subcategories);
      subcategories = resData.categories[0].subcategories;
      first_subcat = subcategories[0];
      console.log(first_subcat);     
      setTimeout(() => {
        if(mainCategory.id != 116 && mainCategory.id != 117){
          this.router.navigate(['products', mainCategory.id,mainCategory.name,first_subcat.sub_id,first_subcat.name])
        }
        else{
          this.router.navigate(['products', mainCategory.id,mainCategory.name]);
        }
      },50)  
    })

  }



}
