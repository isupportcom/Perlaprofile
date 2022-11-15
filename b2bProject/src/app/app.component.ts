import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { grouping, product } from './AdminArea/adminareaproducts/adminareaproducts.component';
import { CartServiceService } from './cart/cart-service.service';
import { ProductsService } from './porducts/products.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  backOrder: boolean = false;
  title = 'b2bProject';
  age = '10';
  loggedIn: boolean = true;
  productAdded?: boolean = false;
  waiting?: boolean = false;
  TopScroll: any;
  LeftScroll: any;
  products: product[] = [];
  singleProduct: any;

  relatedProducts:product|any = [];
  group: any;
  showScope3: boolean = false;
  itemsToCart: product|any = [];
  tempGroup: grouping[] | any = [];
  date = new Date();
  btnLoading: boolean = false;

  changeBtn?: boolean;
  constructor(

    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private cartService: CartServiceService,
    private renderer: Renderer2,
    private productService: ProductsService,
    private translate: TranslateService
  ) {

  }
  innerWidth:any;
  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 768){
      this.changeBtn = true;
    }
    else{
      this.changeBtn = false;
    }
  }


  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 768){
      this.changeBtn = true;
    }
    else{
      this.changeBtn = false;
    }

    this.productService.backOrderPopup.subscribe(resData => {
      if(resData){
        this.backOrder = resData
      }
      
    });

    console.log(this.date.getHours()+':'+this.date.getMinutes());

    this.authService.autoLogin();
    if (localStorage.getItem('username') == 'Admin') {
      this.authService.setAdmin(true);
    }

    this.route.data.subscribe((data: Data) => {
      console.log(data);
    });
    this.authService.loggedIn.subscribe((res) => {


      this.loggedIn = res;

    });



    this.cartService.startScope.subscribe(res => {
      this.itemsToCart = [];
      this.products = this.productService.getAll();
      this.singleProduct = this.productService.getSingelProduct();

      let relatedProductsObs: Observable<any>;

      relatedProductsObs = this.productService.getRelatedProducts(this.singleProduct.mtrl);

      relatedProductsObs.subscribe(resData => {
        this.relatedProducts = resData.related;
      })
      setTimeout(() => {
        console.log(this.relatedProducts);
        for(let relatedProd of this.relatedProducts){
          let groupingObs: Observable<any>;
          let temp;
          relatedProd.qty = this.singleProduct.qty;
          let scope2b;
          groupingObs = this.productService.setGrouping(this.singleProduct.mtrl,relatedProd.grouping);

          groupingObs.subscribe(resData => {
            scope2b = resData.Scope2[0];
            scope2b.qty = this.singleProduct.qty;
            temp = {
              scope1: relatedProd,
              scope2: resData.Scope2[0]
            };
            this.tempGroup.push(temp);

          });
        }
      },500);


      this.productAdded = true;

    })


    // this.router.navigate(['log-in'])
  }


  handleGrouping(product: any,btn: any){
    btn.style.opacity = '1';
    this.btnLoading = true;
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');

      setTimeout(() => {


        let groupingObs: Observable<any>;

    groupingObs = this.productService.setGrouping(this.singleProduct.mtrl,product.grouping);

    groupingObs.subscribe(resData => {
      console.log(resData);

      this.group = resData;

    });
    setTimeout(() => {
      console.log(this.group);



      if(this.group.Scope2.length > 0){
        if(this.group.Scope3.length <= 0){
          for(let i=0;i<this.group.Scope2.length;i++){
            this.group.Scope2[i].qty = this.singleProduct.qty;
          }

          this.singleProduct.show = true;
          // this.cartService.addToCart(this.singleProduct);

          this.cartService.sendProductAdded(true);
          this.itemsToCart.push(this.singleProduct);

          product.show = true;


          // this.cartService.addToCart(product);

          this.cartService.sendProductAdded(true);
          this.itemsToCart.push(product);
          for(let prod of this.group.Scope2){
            prod.show = true;
            // this.cartService.addToCart(prod);

            this.cartService.sendProductAdded(true);
            this.itemsToCart.push(prod);
          }
          this.cartService.setItemsToCartArray(this.itemsToCart);

        }
        else{
          for(let i=0;i<this.group.Scope2.length;i++){
            this.group.Scope2[i].qty = this.singleProduct.qty;
          }

          for(let i=0;i<this.group.Scope3.length;i++){
            this.group.Scope3[i].qty = this.singleProduct.qty;
          }

          this.itemsToCart.push(this.singleProduct);
          this.itemsToCart.push(product);
          console.log(product);
          for(let prod of this.group.Scope2){
            this.itemsToCart.push(prod);
          }
          console.log(this.itemsToCart);

          this.showScope3 = true;
        }



        this.productAdded = false;
        // window.location.reload();
      }
      else{
        if(this.group.Scope3.length <= 0){
          this.singleProduct.show = true;
          // this.cartService.addToCart(this.singleProduct);

          this.cartService.sendProductAdded(true);
          this.itemsToCart.push(this.singleProduct);

          product.show = true;
          // this.cartService.addToCart(product);

          this.cartService.sendProductAdded(true);
          this.itemsToCart.push(product);
          this.cartService.setItemsToCartArray(this.itemsToCart);


          window.location.reload();
        }
        else{
          for(let i=0;i<this.group.Scope3.length;i++){
            this.group.Scope3[i].qty = this.singleProduct.qty;
          }

          this.itemsToCart.push(this.singleProduct);
          this.itemsToCart.push(product);
          console.log(this.itemsToCart);
          this.showScope3 = true;
        }



        this.productAdded = false;
         window.location.reload();
      }
      this.btnLoading = false;
      btn.classList.remove('loading');
    },500)
      }, 1000);
    }


  }

  addToCart(product: any,btn?: any){
    btn.style.opacity = '1';
    this.btnLoading = true;
    if(!btn.classList.contains('loading')) {
      btn.classList.add('loading');
      setTimeout(() => {

        this.itemsToCart.push(product);

        this.cartService.setItemsToCartArray(this.itemsToCart);

        let id = '';


        for(let prod of this.itemsToCart){
          id = id + prod.mtrl;
          // prod.show = true;
          // this.cartService.addToCart(prod);
          // localStorage.setItem("products",JSON.stringify(this.cartService.getItems()));
          // this.cartService.sendProductAdded(true);
        }

        this.cartService.setId(id);



        for(let prod of this.itemsToCart){
          // id = id + prod.mtrl;
          prod.group_id = id;
          prod.show = true;

          console.log(prod);


          this.cartService.addToCart(prod);

          this.cartService.sendProductAdded(true);

        }


        this.productAdded = false;
        this.showScope3 = false;

        console.log('OPA');


        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000)

        this.btnLoading = false;
        btn.classList.remove('loading');

      }, 1200);
    }





  }

  continueBackOrder(){
    this.productService.sendBackOrder(true);
    this.backOrder = false;
  }

  stopBackOrder(){
    this.productService.sendBackOrder(false);
    this.backOrder = false;
  }

  handleClose(){

    this.productAdded = false;

    window.location.reload();
  }

  handleGoToCart() {
    this.productAdded = false;
    this.router.navigate(['cart']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }


}
