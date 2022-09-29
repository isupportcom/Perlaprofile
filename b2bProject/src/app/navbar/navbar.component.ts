import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { product } from '../AdminArea/adminareaproducts/adminareaproducts.component';
import { CartServiceService } from '../cart/cart-service.service';
import { ProductsService } from '../porducts/products.service';
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isAdminArea = false;
  products :product |any = [];
  temp: product | any = [];

  // @Input() isAdmin: any;
  @ViewChild('navToggle') navToggle!:ElementRef;



  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('options') options!: ElementRef;
  @ViewChild('optionsToggler') optionsToggler!: ElementRef;
  isOpen = false;
  isToggelOpen = false;
  isAdmin = this.authService.getAdmin();
  productAdded: boolean = false;
  productAdded2: boolean = false;
  showLoggedinNav: boolean = false;
  hoverProducts: boolean = false;
  makeSmallerDropDown?: boolean;
  productAddedToFav: boolean = false;
  source?: string;
  sourceCart?: string;


  @Output() logoutEvent = new EventEmitter<boolean>();
  public isCollapsed = true;
  productCount: number|any;
  showProductCount: boolean = false;
  showUserOptions: boolean = false;
  mainCategories : any = [];
  loadedUser = JSON.parse(localStorage.getItem("userData") || '{}')

  constructor(
    private authService: AuthService,
    private router :Router,
    private route: ActivatedRoute,
    private cartService: CartServiceService,
    private productsService: ProductsService,
    private renderer: Renderer2,
    private http: HttpClient) {


      this.renderer.listen('window', 'click',(e:Event)=>{

        if(e.target !== this.options.nativeElement && e.target !== this.optionsToggler.nativeElement){
          this.showUserOptions = false;
        }
      })

     }

    showSecondNav: boolean = true;
    innerWidth:any;
    @HostListener('window:resize', ['$event'])
    onResize(event: any){
      this.innerWidth = window.innerWidth
      console.log(this.innerWidth);

      if(this.innerWidth < 768 ){
        this.showSecondNav = false;
        this.makeSmallerDropDown = true;
      }
      else{
        this.showSecondNav = true;
        this.makeSmallerDropDown = false;
      }

    }


  username = localStorage.getItem("username");

  async ngOnInit(){

    this.cartService.productCount.subscribe(resData => {
      console.log(resData);
      this.productCount = resData+1;

      // if(resData == 0){
      //   this.productCount = resData+1;
      // }
      // else{
      //   this.productCount = resData;
      // }



    })

    axios.post("https://perlarest.vinoitalia.gr/php-auth-api/favorites.php",{
        trdr: this.loadedUser.trdr,
        mtrl:"dontNeedIt",
        mode:"fetch"
      })
      .then(resData=>{
        console.log(resData.data);

        this.products = resData.data.products
        if(resData.data.products.length !=0){
          this.source = '../../assets/heart-alt-filled.svg'
        }else{
          this.source = '../../assets/heart-alt.svg'
        }
      })

    this.cartService.productAdded.subscribe(resData => {
      if(window.scrollX === 0){
        if(!this.productAdded){
          setTimeout(() => {
            this.productAdded = true;
            this.productAdded2 = true;
            setTimeout(() => {
              this.productAdded = false;
              setTimeout((() => {
                this.productAdded2 = false;
              }),650)
            },1500)
          },400)

        }
      }


    });

    this.cartService.productAddedToFav.subscribe(resData => {
      if(resData){
          setTimeout(() => {
            this.productAddedToFav = resData;
            this.source = '../../assets/heart-alt-filled.svg';
            setTimeout(() => {
              this.productAddedToFav = false;
            },1000)
          },600)





          // this.productAddedToFav = resData;
          // // this.source = '../../assets/heart-alt.svg';
          // setTimeout(() => {
          //   this.source = '../../assets/heart-alt-filled.svg'
          // },330);
          // setTimeout(() => {
          //   this.productAddedToFav = false;
          // },1000)

      }
      else{
        this.productAddedToFav = false;
        this.source = '../../assets/heart-alt.svg';
      }

    })




    if(!this.username){
      this.showLoggedinNav = false;
    }
    else{
      this.showLoggedinNav = true;
    }

    this.cartService.productAdded.subscribe(resData => {
      console.log(resData);

    });


    this.innerWidth = window.innerWidth;
    // console.log(this.innerWidth);

    if(this.innerWidth < 768 ){
      this.showSecondNav = false;
      this.makeSmallerDropDown = true;
    }
    else{
      this.makeSmallerDropDown = false;
      this.showSecondNav = true;
    }

    this.productsService.getMainCategories().subscribe(resData => {
      this.mainCategories = resData;
      console.log(this.mainCategories);

    });

    let fetchProductsObs: Observable<any>;

    fetchProductsObs = this.cartService.getItems()

    fetchProductsObs.subscribe(resData => {
      this.temp = resData.products;
      // console.log(this.temp.length);


    })
    setTimeout(() => {
      // this.products = this.temp;
      console.log(this.temp.length);

    },50)



    this.cartService.productAdded.subscribe(res => {
      this.productAdded = res;
      console.log(this.productAdded);
    })

    // this.cartService.sendProductCount(0);

    // this.cartService.productCount.subscribe(res => {
    //   localStorage.setItem('productCount', <string>(<unknown>res));
    //   console.log(<number>(<unknown>(localStorage.getItem('productCount'))));

    //   this.productCount = <number>(<unknown>(localStorage.getItem('productCount')));
    // })
  }
  hundleMyFavorites(){
    this.router.navigate(['favorites'])
  }
  goToProducts(mainCategory: any){
    console.log(mainCategory);
    this.router.navigate(['products', mainCategory.id,mainCategory.name]);
    setTimeout(() => {
      window.location.reload();
    },50)
  }

  userOptions(){
    if(!this.showUserOptions){
      this.showUserOptions = true;
    }
    else{
      this.showUserOptions = false;
    }

  }

  handleHover(){
    this.hoverProducts = true;
  }

  handleFavorites(){
    this.router.navigate(['favorites']);
  }

  handleMouseleave(){
    this.hoverProducts = false;
  }

  handleLeaveAdminArea(){
    this.isAdminArea = false;
    console.log(this.isAdminArea);
    this.router.navigate(["products"]);
  }
  handleContact(){
    this.router.navigate(['contact'])
  }

  handleDashboard(){
    // this.isAdminArea = true;
    console.log(this.isAdminArea);
    this.router.navigate(["dashboard"]);
  }

  handleMyOrders(){
    this.router.navigate(["my-orders"]);
  }

  handleProfile(){
    this.router.navigate(["profile"]);
  }

  setToggle(){
    this.isToggelOpen = !this.isToggelOpen;
    if(this.isToggelOpen){
      this.navToggle.nativeElement.classList.add('show');
    }else{
      this.navToggle.nativeElement.classList.remove('show')
    }


  }


  handleCategoryClick(){
    setTimeout(() => {
      window.location.reload();
    },100)

  }

  setDropdown(element: HTMLElement){
    this.isOpen = !this.isOpen;
    if(this.isOpen){
      element.classList.add('show');
    }else{
      element.classList.remove('show');
    }



  }

  handleHomepage(){
    this.router.navigate(['home'])
  }

  handleProducts(){
    if(this.router.url !== '/home'){
      window.location.reload();
    }
    else{
      this.router.navigate(['home']);
    }

  }

  logout(){



    console.log(this.authService.user.getValue()?.token);
    this.authService.logout();
    console.log(this.authService.user.getValue());

    localStorage.setItem("userType","notLoggin")
    window.location.reload();
    console.log(JSON.parse(localStorage.getItem('userData') || '{}'));


  }
  navigateTo(destination:string){
    this.router.navigate([destination]);
  }

  handleCart(){
    this.navigateTo('cart');
  }

  login(){
    this.router.navigate(['log-in']);
  }
}

//
