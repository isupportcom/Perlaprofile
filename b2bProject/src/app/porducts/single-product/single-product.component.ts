import { singleProduct } from './../../AdminArea/adminareaproducts/adminareaproducts.component';
import {AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import axios from "axios"
import { Observable, tap } from 'rxjs';
import { CartServiceService } from 'src/app/cart/cart-service.service';
import {product} from "../../AdminArea/adminareaproducts/adminareaproducts.component";
import {ProductsService} from "../products.service";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faBox } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  @ViewChild('productCard') productCard: ElementRef | undefined;
  @ViewChild('productImg') productImg: ElementRef | undefined;
  @ViewChild('addToCartBtn') addToCartBtn: ElementRef | undefined;
  @Input() index:any | singleProduct;
  @Input() filters: any;
  loggedIn: boolean = localStorage.getItem('username')? true : false;
  added?: boolean;
  singleProduct: any;
  relatedProducts:product|any = [];
  productsToCart :product |any =[];
  altCartAnimation: boolean = false;
  loadedUser = JSON.parse(localStorage.getItem("userData") || '{}')
  productCount: any;
  products: any;
  currentLang:any;
  productAddedToFav: boolean = false;
  source?: string;
  clickedAdd: boolean = false;
  faShoppingCart = faShoppingCart
  faBox = faBox;
  reduced: any;
  constructor(
      private renderer: Renderer2,
      private router: Router,
      private route: ActivatedRoute,
      private productsService: ProductsService,
      private cartService: CartServiceService,
      private http: HttpClient
  ) { }

  innerWidth:any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth;

    if(this.innerWidth < 768 ){
      this.altCartAnimation = true;
    }
    else{
      this.altCartAnimation = false;
    }
  }


  ngOnInit(): void {
    console.log(this.index);

    this.reduced =     this.filters.reduce((acc: any[], cur: any) => {
      if (!acc.includes(cur)) {
          acc.push(cur);
      }
      return acc;
  }, [])

  console.log(this.reduced);


    this.currentLang = localStorage.getItem('lang')||'el'
    // console.log(this.index)

    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 768 ){
      this.altCartAnimation = true;
    }
    else{
      this.altCartAnimation = false;
    }




      if(this.index.addedToFav){
        this.added = true;
      }
      else{
        this.added = false;
      }





  }




  handleHover(){
    this.renderer.setStyle(this.productCard?.nativeElement, 'box-shadow', 'rgba(100, 100, 111, 0.4) 0px 7px 29px 0px');
    this.renderer.setStyle(this.productCard?.nativeElement, 'transition', '0.2s box-shadow ease-in');

    this.renderer.setStyle(this.productImg?.nativeElement, 'transform', 'scale(1.1)');
    this.renderer.setStyle(this.productImg?.nativeElement, 'transition' , '0.3s transform ease-in');

    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'box-shadow', 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px');
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'transform' , 'scale(1.02)');
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'transition' , '0.2s box-shadow ease-in, 0.2s transform ease-in' );
  }

  handleMouseLeave(){
    this.renderer.setStyle(this.productCard?.nativeElement, 'box-shadow', 'none');

    this.renderer.setStyle(this.productImg?.nativeElement, 'transform', 'scale(1)');

    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'box-shadow', 'none');
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'transform', 'scale(1)');
  }


  handleBtnHover(){
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'background-color', '#1f2b36');
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'transition' , '0.5s background-color ease-in' );
  }

  handleBtnMouseLeave(){
    this.renderer.setStyle(this.addToCartBtn?.nativeElement, 'background-color', '#2c3e50');
  }

  handleClick(){
    let loadedUser = JSON.parse(localStorage.getItem('userData') || '{}');

    this.productsService.setSingleProduct(this.index);
    axios.post("https://perlarest.vinoitalia.gr/products/getSeeEarlier.php",{
      mtrl:this.index.mtrl,
      trdr:loadedUser.trdr
    }).then(resData=>{
      console.log(resData.data);

    })
    console.log(this.index);

    this.index.addedToFav = this.added

    localStorage.setItem("single",JSON.stringify(this.index));



    setTimeout(() => {
      if(this.router.url === '/products/product-page'){
        window.location.reload();
      }
      else{
        this.router.navigate(['../../product-page', this.reduced],{relativeTo:this.route});
      }

    },100)

  }
  handleAddToFavorite(product:any){
    if(this.added){

      this.index.addedToFav = false;

      this.productAddedToFav = true;
      setTimeout(() => {
        this.added = false;
      }, 350);
      setTimeout(() => {
        this.productAddedToFav = false;
      },1000)
      this.cartService.removeOneFav(product);
    }
    else{
      console.log(product);


      this.productAddedToFav = true;
      setTimeout(() => {
        this.added = true;
      }, 350);
      setTimeout(() => {
        this.productAddedToFav = false;
      },1000)
      this.cartService.sendProductAddedToFav(true);
      this.cartService.addToFavorites(product);
    }


  }


 async handleAddToCart(btn: any){
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => btn.classList.remove('loading'), 3700);
      }
    console.log(btn);

   let req = await axios.post(
      'https://perlarest.vinoitalia.gr/cart/fetchCart.php',
      {
        trdr: this.loadedUser.trdr,
      })
      this.products  = req.data.cart
      console.log(req.data);

      this.cartService.sendProductCount(req.data.cart.length);
    // ).then(resData => {

    //   console.log(resData.data.products.length);


    //   // this.products = resData.data.products;
    //   // this.cartService.sendProductCount(resData.data.products.length);

    // });



    let relatedProductsObs: Observable<any>;

    relatedProductsObs = this.productsService.getRelatedProducts(this.index.mtrl);

    relatedProductsObs.subscribe(resData => {
      console.log(resData);

      this.relatedProducts = resData.related;

    })
    this.cartService.addToCart(this.index);
    // setTimeout(() => {
    //     console.log(this.relatedProducts);


    //   if(this.relatedProducts.length <= 0){

    //     this.cartService.setId(this.index.mtrl)

    //     this.productsService.setSingleProduct(this.index);
    //     this.index.show = true;
    //     this.cartService.addToCart(this.index);

    //     this.cartService.sendProductAdded(true);
    //   }
    //   else{
    //     window.scroll({
    //       top: 0,
    //       left: 0,
    //       behavior: 'smooth'
    //     });
    //     this.productsService.setSingleProduct(this.index);
    //     this.cartService.sendStartScope(true);
    //   }
    // },500);



  }
}
